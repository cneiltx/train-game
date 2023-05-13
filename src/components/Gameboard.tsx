import React, { useEffect, useRef } from 'react';
import blackCar from '../images/train-cars/car-black.png';
import blueCar from '../images/train-cars/car-blue.png';
import greenCar from '../images/train-cars/car-green.png';
import redCar from '../images/train-cars/car-red.png';
import yellowCar from '../images/train-cars/car-yellow.png';
import { Route } from '../model/Route';
import { TrainColor } from '../model/TrainColor';
import { Box } from '@mui/material';
import { Cities } from '../model/Cities';
import { GameController } from '../controllers/GameController';
import { RouteSegment } from '../model/RouteSegment';
import { PlayerState } from '../model/PlayerState';
import { TrainCardColor } from '../model/TrainCardColor';

export interface GameboardProps {
  game: GameController;
  highlightCities?: Cities[];
  highlightRoute?: Route | null;
  onRouteSelected?: (route: Route) => void;
  extraProps?: any;
}

export const Gameboard = (props: GameboardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const image = new Image();
  const cityOuterRadius = 25;
  const carWidth = 15;

  useEffect(() => {
    window.addEventListener('resize', onResize);
    image.src = props.game.map.mapSource;
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
  }, [props.highlightCities, props.highlightRoute]);

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
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    context.restore();
    drawRoutes(context);
    drawCities(context);
  }

  const drawRoutes = (context: CanvasRenderingContext2D) => {
    for (const route of props.game.map.routes) {
      for (const segment of route.segments) {
        drawRouteSegment(context, segment, route);
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
      context.strokeStyle = 'black';
      context.font = `bold ${fontSize}px roboto`;
      context.lineWidth = 5;
      context.fillStyle = 'white';
      context.textAlign = city.printAlign;
      context.textBaseline = 'middle';
      const lines = city.mapName.split('\n');

      lines.forEach((line, index) => {
        context.strokeText(line, city.mapX + city.printXOffset, city.mapY + city.printYOffset + fontSize * index);
        context.fillText(line, city.mapX + city.printXOffset, city.mapY + city.printYOffset + fontSize * index);
      });

      context.restore();
    }
  }

  const drawRouteSegment = (context: CanvasRenderingContext2D, segment: RouteSegment, route: Route) => {
    context.save();

    switch (route.color) {
      case TrainCardColor.Wild:
        context.strokeStyle = route.id === props.highlightRoute?.id ? 'yellow' : 'gainsboro';
        context.fillStyle = 'dimgrey';
        break;
      case TrainCardColor.Black:
        context.strokeStyle = route.id === props.highlightRoute?.id ? 'yellow' : 'gainsboro';
        context.fillStyle = 'black';
        break;
      case TrainCardColor.White:
        context.strokeStyle = route.id === props.highlightRoute?.id ? 'blue' : 'dimgrey';
        context.fillStyle = 'floralwhite';
        break;
      case TrainCardColor.Red:
        context.strokeStyle = route.id === props.highlightRoute?.id ? 'yellow' : 'gainsboro';
        context.fillStyle = 'firebrick';
        break;
      case TrainCardColor.Yellow:
        context.strokeStyle = route.id === props.highlightRoute?.id ? 'blue' : 'dimgrey';
        context.fillStyle = 'gold';
        break;
      case TrainCardColor.Blue:
        context.strokeStyle = route.id === props.highlightRoute?.id ? 'yellow' : 'gainsboro';
        context.fillStyle = 'royalblue';
        break;
      case TrainCardColor.Orange:
        context.strokeStyle = route.id === props.highlightRoute?.id ? 'blue' : 'gainsboro';
        context.fillStyle = 'orange';
        break;
      case TrainCardColor.Green:
        context.strokeStyle = route.id === props.highlightRoute?.id ? 'yellow' : 'gainsboro';
        context.fillStyle = 'mediumseagreen';
        break;
      case TrainCardColor.Purple:
        context.strokeStyle = route.id === props.highlightRoute?.id ? 'yellow' : 'gainsboro';
        context.fillStyle = 'palevioletred';
        break;
    }

    context.lineWidth = route.id === props.highlightRoute?.id ? 8 : 4;
    context.translate(segment.x, segment.y);
    context.rotate(segment.angle * Math.PI / 180);
    context.globalAlpha = 1;
    context.strokeRect(-route.segmentLength / 2, -carWidth / 2, route.segmentLength, carWidth);
    context.globalAlpha = 0.55;
    context.fillRect(-route.segmentLength / 2, -carWidth / 2, route.segmentLength, carWidth);
    context.restore();
  }

  const drawTrain = (context: CanvasRenderingContext2D, route: Route) => {
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

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (canClick()) {
      const canvas = canvasRef.current;

      if (canvas) {
        const context = canvas.getContext('2d')!;
        const canvasCoords = toCanvasCoords(canvas, e.pageX, e.pageY);

        for (const route of props.game.map.routes.filter((value) => value.train === null)) {
          for (const segment of route.segments) {
            context.save();
            context.translate(segment.x, segment.y);
            context.rotate(segment.angle * Math.PI / 180);
            context.beginPath();
            context.rect(-route.segmentLength / 2, -carWidth / 2, route.segmentLength, carWidth);
            if (context.isPointInPath(canvasCoords.x, canvasCoords.y)) {
              if (props.onRouteSelected) {
                props.onRouteSelected(route);
              }
            }
            context.restore();
          }
        }
      }
    }
  }

  const toCanvasCoords = (canvas: HTMLCanvasElement, pageX: number, pageY: number) => {
    const xScale = canvas.clientWidth / canvas.width;
    const yScale = canvas.clientHeight / canvas.height;
    const rect = canvas.getBoundingClientRect();
    let x = (pageX - rect.left) / xScale;
    let y = (pageY - rect.top) / yScale;
    return { x: x, y: y };
  }

  const canClick = () => {
    return props.game.localPlayer?.state === PlayerState.StartingTurn;
  }

  const style: any = {};
  if (canClick()) {
    style['cursor'] = 'pointer';
  }

  return (
    <Box padding='1.5vh' {...props.extraProps} textAlign='center' >
      <Box component='canvas' ref={canvasRef} onClick={handleClick} style={style} sx={{ maxHeight: '100%', maxWidth: '100%' }} />
    </Box>
  );
}