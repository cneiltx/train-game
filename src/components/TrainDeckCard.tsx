import blackCard from '../images/train-cards/card-black.png';
import blueCard from '../images/train-cards/card-blue.png';
import greenCard from '../images/train-cards/card-green.png';
import orangeCard from '../images/train-cards/card-orange.png';
import purpleCard from '../images/train-cards/card-purple.png';
import rainbowCard from '../images/train-cards/card-rainbow.png';
import redCard from '../images/train-cards/card-red.png';
import whiteCard from '../images/train-cards/card-white.png';
import yellowCard from '../images/train-cards/card-yellow.png';
import cardBack from '../images/train-cards/card-back.png';
import { TrainCardColor } from "../model/TrainCardColor";
import { Box, Fade } from "@mui/material";
import { useEffect, useRef, useState } from 'react';
import { TrainCard } from '../model/TrainCard';
import { GameController, PlayerStateChangeEventArgs } from '../controllers/GameController';
import { PlayerState } from '../model/PlayerState';

export interface TrainDeckCardProps {
  card: TrainCard;
  game: GameController;
  mode: 'drawDeck' | 'drawFaceUp' | 'playerHand';
  extraProps?: any;
}

export const TrainDeckCard = (props: TrainDeckCardProps) => {
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
  }, [props.game]);

  const handlePlayerStateChange = (e: CustomEventInit<PlayerStateChangeEventArgs>) => {
    if (e.detail!.player.name === props.game.localPlayer?.name) {
      setLocalPlayerState(e.detail!.state);
    }
  }

  useEffect(() => {
    if (props.mode === 'drawFaceUp' || props.mode === 'playerHand') {
      switch (props.card.color) {
        case TrainCardColor.Black:
          image.src = blackCard;
          break;
        case TrainCardColor.Blue:
          image.src = blueCard;
          break;
        case TrainCardColor.Green:
          image.src = greenCard;
          break;
        case TrainCardColor.Orange:
          image.src = orangeCard;
          break;
        case TrainCardColor.Purple:
          image.src = purpleCard;
          break;
        case TrainCardColor.Rainbow:
          image.src = rainbowCard;
          break;
        case TrainCardColor.Red:
          image.src = redCard;
          break;
        case TrainCardColor.White:
          image.src = whiteCard;
          break;
        case TrainCardColor.Yellow:
          image.src = yellowCard;
          break;
      }
    } else {
      image.src = cardBack;
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
  }, [props.mode, props.card]);

  const onResize = () => {
    const canvas = canvasRef.current!;

    if (canvas) {
      const context = canvas.getContext('2d')!;
      drawCard(canvas, context);
    }
  }

  const drawCard = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0);
  }

  const handleClick = () => {
    switch (props.mode) {
      case 'drawDeck':
        props.game.drawTrainCardFromDeck();
        break;
      case 'drawFaceUp':
        props.game.drawFaceUpTrainCard(props.card);
        break;
    }
  }

  const style = { ...props.extraProps?.style };
  if ((localPlayerState === PlayerState.StartingTurn || localPlayerState === PlayerState.DrawingTrainCards)
    && (props.mode === 'drawFaceUp' || props.mode === 'drawDeck')) {
    style['cursor'] = 'pointer';
  }

  const newProps = { ...props.extraProps };
  newProps['style'] = style;

  return (
    <Fade in={fade} timeout={750}>
      <Box {...newProps} component='canvas' ref={canvasRef} onClick={handleClick} />
    </Fade>
  );
}