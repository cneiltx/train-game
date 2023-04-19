import { useEffect, useRef } from 'react';
import usMap from '../images/ttr-us-map.png';
import blackCar from '../images/train-cars/car-black.png';
import blueCar from '../images/train-cars/car-blue.png';
import greenCar from '../images/train-cars/car-green.png';
import redCar from '../images/train-cars/car-red.png';
import yellowCar from '../images/train-cars/car-yellow.png';
import { Route } from '../model/Route';
import { RouteColor } from '../model/RouteColor';
import { TrainColor } from '../model/TrainColor';
import { Box } from '@mui/material';
import { USCities } from '../model/USCities';
import { GameController } from '../controllers/GameController';

export type GameboardProps = {
  game: GameController;
  onCityClick?: (city: USCities) => void;
  highlightCities?: USCities[];
  extraProps?: any;
}

export const Gameboard = (props: GameboardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const image = new Image();
  const cityOuterRadius = 25;

  useEffect(() => {
    window.addEventListener('resize', onResize);
    image.src = usMap;
    image.onload = () => {
      const canvas = canvasRef.current;

      if (canvas) {
        canvas.height = image.height;
        canvas.width = image.width;
        onResize();
      }
    }
    return () => window.removeEventListener('resize', onResize);
  }, [props.highlightCities]);

  const onResize = () => {
    const canvas = canvasRef.current;

    if (canvas) {
      const context = canvas.getContext('2d')!;
      drawMap(canvas, context);
    }
  }

  const drawMap = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 0.7;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    context.restore();
    drawRoutes(context);
    drawCities(context);
  }

  const drawRoutes = (context: CanvasRenderingContext2D) => {
    for (const route of props.game.map.routes) {
      for (const segment of route.segments) {
        drawRouteSegment(context, segment.x, segment.y, segment.angle, route.color, route.segmentLength);
      }
    }
  }

  const drawCities = (context: CanvasRenderingContext2D) => {
    for (const city of props.game.map.cities) {
      context.save();
      const cityRadius = 7.5;
      const lineWidth = 4;
      context.strokeStyle = 'gold';
      context.lineWidth = lineWidth;
      const gradient = context.createRadialGradient(city.mapX, city.mapY, cityRadius / 4, city.mapX, city.mapY, cityRadius);
      gradient.addColorStop(0, 'firebrick');
      gradient.addColorStop(.55, 'indianred');
      gradient.addColorStop(1, 'firebrick');
      context.fillStyle = gradient;

      context.beginPath();
      context.arc(city.mapX, city.mapY, cityRadius, 0, 2 * Math.PI);
      context.stroke();
      context.fill();

      if (props.highlightCities && props.highlightCities.find((item) => item === city.city) !== undefined) {
        context.fillStyle = 'rgba(0, 0, 128, 0.65)';
        context.beginPath();
        context.arc(city.mapX, city.mapY, cityOuterRadius, 0, Math.PI * 2, false);
        context.arc(city.mapX, city.mapY, cityRadius + lineWidth / 2, 0, Math.PI * 2, true);
        context.fill();
      }

      const fontSize = 19;
      context.strokeStyle = 'white';
      context.font = `bold ${fontSize}px system-ui`;
      context.lineWidth = 3;
      context.fillStyle = 'black';
      context.textAlign = city.printAlign;
      context.textBaseline = 'middle';
      const lines = city.printName.split('\n');

      lines.forEach((line, index) => {
        context.strokeText(line, city.mapX + city.printXOffset, city.mapY + city.printYOffset + fontSize * index);
        context.fillText(line, city.mapX + city.printXOffset, city.mapY + city.printYOffset + fontSize * index);
      });

      context.restore();
    }
  }

  const drawRouteSegment = (context: CanvasRenderingContext2D, x: number, y: number, angle: number, color: RouteColor, carLength: number) => {
    context.save();
    const carWidth = 15;

    switch (color) {
      case RouteColor.Grey:
        context.strokeStyle = 'floralwhite';
        context.fillStyle = 'dimgrey';
        break;
      case RouteColor.Black:
        context.strokeStyle = 'floralwhite';
        context.fillStyle = 'black';
        break;
      case RouteColor.White:
        context.strokeStyle = 'dimgrey';
        context.fillStyle = 'floralwhite';
        break;
      case RouteColor.Red:
        context.strokeStyle = 'floralwhite';
        context.fillStyle = 'firebrick';
        break;
      case RouteColor.Yellow:
        context.strokeStyle = 'dimgrey';
        context.fillStyle = 'gold';
        break;
      case RouteColor.Blue:
        context.strokeStyle = 'floralwhite';
        context.fillStyle = 'royalblue';
        break;
      case RouteColor.Orange:
        context.strokeStyle = 'dimgrey';
        context.fillStyle = 'orange';
        break;
      case RouteColor.Green:
        context.strokeStyle = 'floralwhite';
        context.fillStyle = 'mediumseagreen';
        break;
      case RouteColor.Pink:
        context.strokeStyle = 'floralwhite';
        context.fillStyle = 'palevioletred';
        break;
    }

    context.lineWidth = 4
    context.translate(x, y);
    context.rotate(angle * Math.PI / 180);
    context.globalAlpha = 0.55;
    context.strokeRect(-carLength / 2, -carWidth / 2, carLength, carWidth);
    context.fillRect(-carLength / 2, -carWidth / 2, carLength, carWidth);
    context.restore();
  }

  const drawTrain = (context: CanvasRenderingContext2D, route: Route) => {
    const carWidth = 15;

    for (const segment of route.segments) {
      const image = new Image();

      switch (route.train) {
        case TrainColor.Red:
          image.src = redCar;
          break;
        case TrainColor.Yellow:
          image.src = yellowCar;
          break;
        case TrainColor.Blue:
          image.src = blueCar;
          break;
        case TrainColor.Green:
          image.src = greenCar;
          break;
        case TrainColor.Black:
          image.src = blackCar;
          break;
      }

      context.save();
      context.translate(segment.x, segment.y);
      context.rotate(segment.angle * Math.PI / 180);
      context.drawImage(image, -route.segmentLength / 2, -carWidth / 2, route.segmentLength, carWidth);
      context.restore();
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (props.onCityClick) {
      for (const city of props.game.map.cities) {
        const canvasCoords = toCanvasCoords(event.pageX, event.pageY);
        const xDelta = city.mapX - canvasCoords.x;
        const yDelta = city.mapY - canvasCoords.y;
        if (Math.sqrt(xDelta ** 2 + yDelta ** 2) <= cityOuterRadius) {
          props.onCityClick(city.city);
        }
      }
    }
  }

  const toCanvasCoords = (pageX: number, pageY: number) => {
    var canvas = canvasRef.current;

    if (canvas) {
      const xScale = canvas.clientWidth / canvas.width;
      const yScale = canvas.clientHeight / canvas.height;
      const rect = canvas.getBoundingClientRect();
      let x = (pageX - rect.left) / xScale;
      let y = (pageY - rect.top) / yScale;
      return { x: x, y: y };
    } else {
      return { x: 0, y: 0 };
    }
  }

  return (
    <Box boxShadow='inset 0 0 0 3px darkblue' padding='1.5vh' {...props.extraProps} textAlign='center' >
      <Box component='canvas' ref={canvasRef} onClick={handleClick} sx={{ maxHeight: '100%', maxWidth: '100%' }} />
    </Box>
  );
}