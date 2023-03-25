import cardBack from '../images/destination-cards/card-back.png';
import cardFront from '../images/destination-cards/card-front.png';
import { Box } from "@mui/material";
import { USCities } from '../model/USCities';
import { useEffect, useRef } from 'react';
import { DestinationCard } from '../model/DestinationCard';

export type DestinationDeckCardProps = {
  card: DestinationCard;
  faceUp: boolean;
  rotate?: boolean;
  extraProps?: any;
}

export const DestinationDeckCard = (props: DestinationDeckCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const image = new Image();

  useEffect(() => {
    if (props.faceUp) {
      image.src = cardFront;
    } else {
      image.src = cardBack;
    }

    window.addEventListener('resize', onResize);

    image.onload = () => {
      onResize();
    }
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const onResize = () => {
    const canvas = canvasRef.current!;
    let scale = 1;

    if (canvas.parentElement!.clientWidth / image.width > canvas.parentElement!.clientHeight / image.height) {
      canvas.height = canvas.parentElement!.clientHeight - (canvas.offsetHeight - canvas.clientHeight);
      canvas.width = canvas.height * image.width / image.height;
      scale = canvas.height / image.height;
    } else {
      canvas.width = canvas.parentElement!.clientWidth - (canvas.offsetWidth - canvas.clientWidth);
      canvas.height = canvas.width * image.height / image.width;
      scale = canvas.width / image.width;
    }

    if (props.rotate) {
      canvas.width = canvas.clientHeight * image.height / image.width;
      drawCard(canvas.clientHeight / image.width);
    } else {
      canvas.width = canvas.clientHeight * image.width / image.height;
      drawCard(scale);
    }
  }

  const drawCard = (scale: number) => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    drawBackground(context, canvas.width, canvas.height, scale);

    if (props.faceUp) {
      context.scale(scale, scale);
      drawTitle(context);
      drawValue(context);
      drawRoute(context);
      drawCities(context);
      context.restore();
    }
  }

  const drawBackground = (context: CanvasRenderingContext2D, width: number, height: number, scale: number) => {
    context.save();
    context.clearRect(0, 0, width, height);
    context.translate(width / 2, height / 2);
    if (props.rotate) {
      context.rotate(-90 * Math.PI / 180);
    }
    context.scale(scale, scale);
    context.drawImage(image, -image.width / 2, -image.height / 2);
    context.restore();
  }

  const drawCities = (context: CanvasRenderingContext2D) => {
    const cityRadius = 1.1;
    context.fillStyle = 'indianred';
    cityMap.forEach((coordinate) => {
      context.beginPath();
      let [x, y] = [coordinate.x, coordinate.y];
      if (props.rotate) {
        [x, y] = [y, image.width - x];
      }
      context.arc(x, y, cityRadius, 0, 2 * Math.PI);
      context.fill();
    })
  }

  const drawTitle = (context: CanvasRenderingContext2D) => {
    const fontSize = 11;
    let [x, y] = [125, 27];
    context.save();
    if (props.rotate) {
      context.translate(y, image.width - x);
      context.rotate(-Math.PI / 2);
      [x, y] = [0, 0];
    }
    context.font = `bold ${fontSize}px system-ui`;
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    const text = `${props.card.city1} - ${props.card.city2}`;
    context.fillText(text, x, y);
    context.restore();
  }

  const drawValue = (context: CanvasRenderingContext2D) => {
    const fontSize = 30;
    let [x, y] = [211, 125];
    context.save();
    if (props.rotate) {
      context.translate(y, image.width - x);
      context.rotate(-Math.PI / 2);
      [x, y] = [0, 0];
    }
    context.font = `bold ${fontSize}px system-ui`;
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    const text = props.card.points.toString();
    context.fillText(text, x, y);
    context.restore();
  }

  const drawRoute = (context: CanvasRenderingContext2D) => {
    const city1Coords = cityMap.get(props.card.city1)!;
    const city2Coords = cityMap.get(props.card.city2)!;
    let [x1, y1] = [city1Coords.x, city1Coords.y];
    let [x2, y2] = [city2Coords.x, city2Coords.y];
    if (props.rotate) {
      [x1, y1] = [y1, image.width - x1];
      [x2, y2] = [y2, image.width - x2];
    }
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = 'darkgoldenrod';
    context.lineWidth = 3;
    context.stroke();
    drawCityRing(context, props.card.city1);
    drawCityRing(context, props.card.city2);
  }

  const drawCityRing = (context: CanvasRenderingContext2D, city: USCities) => {
    context.fillStyle = 'navy';
    context.beginPath();
    const coordinates = cityMap.get(city)!;
    let [x, y] = [coordinates.x, coordinates.y];
    if (props.rotate) {
      [x, y] = [y, image.width - x];
    }
    context.strokeStyle = 'navy';
    context.lineWidth = 4;
    context.arc(x, y, 4, 0, 2 * Math.PI);
    context.stroke();
  }

  const cityMap = new Map([
    [USCities.Atlanta, { x: 156, y: 109 }],
    [USCities.Billings, { x: 79, y: 62 }],
    [USCities.Boston, { x: 188, y: 66 }],
    [USCities.Calgary, { x: 66, y: 40 }],
    [USCities.Charleston, { x: 173, y: 108 }],
    [USCities.Chicago, { x: 139, y: 78 }],
    [USCities.Dallas, { x: 112, y: 118 }],
    [USCities.Denver, { x: 87, y: 88 }],
    [USCities.ElPaso, { x: 81, y: 120 }],
    [USCities.Houston, { x: 115, y: 128 }],
    [USCities.KansasCity, { x: 117, y: 91 }],
    [USCities.LasVegas, { x: 52, y: 97 }],
    [USCities.LittleRock, { x: 128, y: 109 }],
    [USCities.LosAngeles, { x: 36, y: 102 }],
    [USCities.Miami, { x: 176, y: 137 }],
    [USCities.Minneapolis, { x: 122, y: 68 }],
    [USCities.Montreal, { x: 176, y: 55 }],
    [USCities.Nashville, { x: 145, y: 102 }],
    [USCities.NewOrleans, { x: 138, y: 127 }],
    [USCities.NewYork, { x: 182, y: 73 }],
    [USCities.OklahomaCity, { x: 110, y: 106 }],
    [USCities.Omaha, { x: 113, y: 82 }],
    [USCities.Phoenix, { x: 60, y: 109 }],
    [USCities.Pittsburgh, { x: 165, y: 80 }],
    [USCities.Portland, { x: 37, y: 57 }],
    [USCities.Raleigh, { x: 174, y: 98 }],
    [USCities.SaintLouis, { x: 131, y: 93 }],
    [USCities.SaltLakeCity, { x: 63, y: 82 }],
    [USCities.SanFrancisco, { x: 30, y: 88 }],
    [USCities.SantaFe, { x: 81, y: 104 }],
    [USCities.SaultSteMarie, { x: 148, y: 59 }],
    [USCities.Seattle, { x: 41, y: 49 }],
    [USCities.Toronto, { x: 165, y: 66 }],
    [USCities.Vancouver, { x: 41, y: 41 }],
    [USCities.Washington, { x: 175, y: 84 }],
    [USCities.Winnipeg, { x: 109, y: 47 }],
  ]);

  return (
    <Box border='solid green' {...props.extraProps} display='flex' justifyContent='center' alignItems='center' >
      <Box border='solid orange' component='canvas' ref={canvasRef} />
    </Box>
  );
}