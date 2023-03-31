import cardBack from '../images/destination-cards/card-back.png';
import cardFront from '../images/destination-cards/card-front.png';
import { Box } from "@mui/material";
import { USCities } from '../model/USCities';
import { useEffect, useRef } from 'react';
import { DestinationCard } from '../model/DestinationCard';

export type DestinationDeckCardProps = {
  card: DestinationCard;
  faceUp: boolean;
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
      const canvas = canvasRef.current;

      if (canvas) {
        canvas.height = image.height;
        canvas.width = image.width;
        onResize();
      }
    }
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const onResize = () => {
    const canvas = canvasRef.current;

    if (canvas) {
      const context = canvas.getContext('2d')!;
      drawCard(canvas, context);
    }
  }

  const drawCard = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
    drawBackground(canvas, context);

    if (props.faceUp) {
      drawTitle(context);
      drawValue(context);
      drawRoute(context);
      drawCities(context);
    }
  }

  const drawBackground = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0);
  }

  const drawCities = (context: CanvasRenderingContext2D) => {
    const cityRadius = 1.1;
    context.fillStyle = 'indianred';
    cityMap.forEach((coordinate) => {
      context.beginPath();
      let [x, y] = [coordinate.x, coordinate.y];
      context.arc(x, y, cityRadius, 0, 2 * Math.PI);
      context.fill();
    })
  }

  const drawTitle = (context: CanvasRenderingContext2D) => {
    const fontSize = 19;
    let [x, y] = [125, 27];
    context.save();
    context.font = `bold ${fontSize}px system-ui`;
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    const text = `${props.card.city1} - ${props.card.city2}`;
    context.lineWidth = 1;
    context.fillText(text, x, y, 180);
    context.restore();
  }

  const drawValue = (context: CanvasRenderingContext2D) => {
    const fontSize = 30;
    let [x, y] = [211, 125];
    context.save();
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
    <Box {...props.extraProps} textAlign='center' >
      <Box component='canvas' ref={canvasRef} sx={{ maxHeight: '100%', maxWidth: '100%' }} />
    </Box>
  );
}