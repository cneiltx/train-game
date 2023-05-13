import cardBack from '../images/destination-cards/card-back.png';
import cardFront from '../images/destination-cards/card-front.png';
import { Box, Fade } from "@mui/material";
import { useEffect, useRef, useState } from 'react';
import { DestinationCard } from '../model/DestinationCard';
import { City } from '../model/City';
import { GameController, PlayerStateChangeEventArgs } from '../controllers/GameController';
import { PlayerState } from '../model/PlayerState';

export interface DestinationDeckCardProps {
  card: DestinationCard;
  game: GameController;
  mode: 'drawDeck' | 'drawFaceUp' | 'playerHand';
  onClick?: (card: DestinationCard) => void;
  onMouseEnter?: (card: DestinationCard) => void;
  onMouseLeave?: (card: DestinationCard) => void;
  selected?: boolean;
  extraProps?: any;
}

export const DestinationDeckCard = (props: DestinationDeckCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const image = new Image();
  const [fade, setFade] = useState(false);
  const [localPlayerState, setLocalPlayerState] = useState(props.game.localPlayer?.state);

  useEffect(() => {
    setFade(true);
  }, []);

  useEffect(() => {
    props.game.addEventListener('onPlayerStateChange', (e) => handlePlayerStateChange(e));
    return props.game.removeEventListener('onPlayerStateChange', handlePlayerStateChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlayerStateChange = (e: CustomEventInit<PlayerStateChangeEventArgs>) => {
    if (e.detail!.player.name === props.game.localPlayer?.name) {
      setLocalPlayerState(e.detail!.state);
    }
  }

  useEffect(() => {
    if (props.mode === 'drawDeck') {
      image.src = cardBack;
    } else {
      image.src = cardFront;
    }

    window.addEventListener('resize', onResize);
    image.onload = () => {
      const canvas = canvasRef.current;

      if (canvas) {
        canvas.height = image.height;
        canvas.width = image.width;
        onResize();
      }
    }
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const onResize = () => {
    const canvas = canvasRef.current;

    if (canvas) {
      const context = canvas.getContext('2d')!;
      drawCard(canvas, context);
    }
  }

  const drawCard = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
    drawBackground(canvas, context);

    if (props.mode !== 'drawDeck') {
      const city1 = props.game.map.cities.find((item) => item.city === props.card.city1);
      const city2 = props.game.map.cities.find((item) => item.city === props.card.city2);

      if (city1 && city2) {
        drawTitle(context, city1, city2);
        drawCities(context);
        drawValue(context);
        drawRoute(context, city1, city2);
      }
    }
  }

  const drawBackground = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0);

    if (props.card.complete) {
      context.fillStyle = 'rgba(76, 187, 23, 0.5)'
      context.beginPath();
      context.roundRect(0, 0, canvas.width, canvas.height, 10);
      context.fill();
    }

    if (props.selected) {
      context.strokeStyle = 'gold';
      context.lineWidth = 7;
      context.beginPath();
      context.roundRect(context.lineWidth / 2, context.lineWidth / 2, canvas.width - context.lineWidth, canvas.height - context.lineWidth, 10);
      context.stroke();
    }
  }

  const drawCities = (context: CanvasRenderingContext2D) => {
    const cityRadius = 1.1;
    context.fillStyle = 'indianred';
    props.game.map.cities.forEach((city) => {
      context.beginPath();
      let [x, y] = [city.cardX, city.cardY];
      context.arc(x, y, cityRadius, 0, 2 * Math.PI);
      context.fill();
    })
  }

  const drawTitle = (context: CanvasRenderingContext2D, city1: City, city2: City) => {
    let [x, y] = [125, 27];
    context.save();
    context.font = `bold 18px roboto`;
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    const text = `${city1.name} - ${city2.name}`;
    context.lineWidth = 1;
    context.fillText(text, x, y, 180);
    context.restore();
  }

  const drawValue = (context: CanvasRenderingContext2D) => {
    let [x, y] = [211, 125];
    context.save();
    context.font = `bold 28px roboto`;
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    const text = props.card.points.toString();
    context.fillText(text, x, y);
    context.restore();
  }

  const drawRoute = (context: CanvasRenderingContext2D, city1: City, city2: City) => {
    let [x1, y1] = [city1.cardX, city1.cardY];
    let [x2, y2] = [city2.cardX, city2.cardY];
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = 'darkgoldenrod';
    context.lineWidth = 3;
    context.stroke();
    drawCityRing(context, city1);
    drawCityRing(context, city2);
  }

  const drawCityRing = (context: CanvasRenderingContext2D, city: City) => {
    context.fillStyle = 'navy';
    context.beginPath();
    let [x, y] = [city.cardX, city.cardY];
    context.strokeStyle = 'navy';
    context.lineWidth = 4;
    context.arc(x, y, 4, 0, 2 * Math.PI);
    context.stroke();
  }

  const handleClick = () => {
    if (canClick() && props.onClick) {
      props.onClick(props.card);
    }
  }

  const handleMouseEnter = () => {
    if (props.onMouseEnter) {
      props.onMouseEnter(props.card);
    }
  }

  const handleMouseLeave = () => {
    if (props.onMouseLeave) {
      props.onMouseLeave(props.card);
    }
  }

  const canClick = () => {
    return props.mode === 'drawFaceUp' || props.mode === 'drawDeck' && localPlayerState === PlayerState.StartingTurn;
  }

  const style = { ...props.extraProps?.style };
  if (canClick()) {
    style['cursor'] = 'pointer';
  } else {
    if (props.mode !== 'playerHand' && localPlayerState !== PlayerState.Waiting) {
      style['filter'] = 'brightness(0.4)';
    }
  }

  const newProps = { ...props.extraProps };
  newProps['style'] = style;

  return (
    <Fade in={fade} timeout={750}>
      <Box
        component='canvas'
        {...newProps}
        ref={canvasRef}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{ maxHeight: '100%', maxWidth: '100%' }} />
    </Fade>
  );
}