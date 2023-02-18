import { useEffect, useRef } from 'react';
import usMap from '../images/ttr-us-map.png';
import redCar from '../images/car-red.png';
import yellowCar from '../images/car-yellow.png';
import blueCar from '../images/car-blue.png';
import greenCar from '../images/car-green.png';
import purpleCar from '../images/car-purple.png';
import blackCar from '../images/car-black.png';
import { RouteColor } from '../model/RouteColor';
import { GameMap } from '../model/GameMap';
import { TrainColor } from '../model/TrainColor';
import { Route } from '../model/Route';

export type GameboardProps = {
  width: string;
  height: string;
}

const map = new GameMap();

export const Gameboard = (props: GameboardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    const image = new Image();
    image.src = usMap;
    image.onload = () => {
      context.save();
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.globalAlpha = 0.7;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      context.restore();
      DrawRoutes(context);
      DrawCities(context);
    }
  }, []);

  const FindOpenRoute = (city1: string, city2: string) => {
    return map.routes.find(item => item.train === null && ((item.city1 === city1 && item.city2 === city2) || (item.city1 === city2 && item.city2 === city1)));
  }

  const DrawRoutes = (context: CanvasRenderingContext2D) => {
    for (const route of map.routes) {
      for (const segment of route.segments) {
        DrawRouteSegment(context, segment.x, segment.y, segment.angle, route.color, route.carLength);
      }
      route.train = TrainColor.Black;
      DrawTrain(context, route);
    }
  }

  const DrawCities = (context: CanvasRenderingContext2D) => {
    DrawCity(context, 120, 45, 'Vancouver', 10, -20, 'right');
    DrawCity(context, 330, 25, 'Calgary', 10, -15, 'left');
    DrawCity(context, 698, 91, 'Winnipeg', -10, -20, 'left');
    DrawCity(context, 1005, 175, 'Sault St.\nMarie', 0, -40, 'center');
    DrawCity(context, 1264, 158, 'Montreal', -10, -20, 'left');
    DrawCity(context, 1353, 255, 'Boston', 15, 0, 'left');
    DrawCity(context, 116, 106, 'Seattle', -15, 5, 'right');
    DrawCity(context, 432, 215, 'Billings', -31, 13, 'right'); // substituted for Helena
    DrawCity(context, 799, 266, 'Minneapolis', -37, 15, 'right'); // substituted for Duluth
    DrawCity(context, 1154, 255, 'Toronto', 15, 0, 'left');
    DrawCity(context, 724, 389, 'Omaha', -11, 23, 'right');
    DrawCity(context, 936, 347, 'Chicago', 2, 26, 'left');
    DrawCity(context, 1148, 364, 'Pittsburgh', -10, -38, 'right');
    DrawCity(context, 1304, 316, 'New York', 12, 17, 'left');
    DrawCity(context, 1229, 402, 'Washington', 16, 21, 'left');
    DrawCity(context, 84, 188, 'Portland', -12, -10, 'right');
    DrawCity(context, 27, 430, 'San Francisco', 30, 27, 'left');
    DrawCity(context, 318, 381, 'Salt Lake City', -45, -20, 'right');
    DrawCity(context, 498, 437, 'Denver', -40, 22, 'right');
    DrawCity(context, 761, 465, 'Kansas\nCity', 9, 31, 'left');
    DrawCity(context, 877, 472, 'Saint\nLouis', -14, -45, 'right');
    DrawCity(context, 985, 545, 'Nashville', 15, 0, 'left');
    DrawCity(context, 1208, 516, 'Raleigh', 15, 0, 'left');
    DrawCity(context, 1064, 615, 'Atlanta', -35, -10, 'right');
    DrawCity(context, 1210, 608, 'Charleston', 15, 3, 'left');
    DrawCity(context, 105, 573, 'Los Angeles', 5, 20, 'right');
    DrawCity(context, 213, 524, 'Las Vegas', -5, 20, 'left');
    DrawCity(context, 286, 614, 'Phoenix', 0, 20, 'right');
    DrawCity(context, 458, 564, 'Santa Fe', 12, 25, 'left');
    DrawCity(context, 697, 588, 'Oklahoma\nCity', 39, -28, 'left');
    DrawCity(context, 843, 608, 'Little Rock', 15, 14, 'left');
    DrawCity(context, 450, 708, 'El Paso', 0, 25, 'right');
    DrawCity(context, 720, 682, 'Dallas', -27, -10, 'right');
    DrawCity(context, 762, 769, 'Houston', 0, 25, 'center');
    DrawCity(context, 932, 766, 'New\nOrleans', 0, 22, 'right');
    DrawCity(context, 1238, 862, 'Miami', 15, 0, 'left');
  }

  const DrawCity = (context: CanvasRenderingContext2D, x: number, y: number, name: string, xOffset: number, yOffset: number, align: CanvasTextAlign) => {
    context.save();
    const cityRadius = 7.5;
    context.strokeStyle = 'gold';
    context.lineWidth = 4
    const gradient = context.createRadialGradient(x, y, cityRadius / 4, x, y, cityRadius);
    gradient.addColorStop(0, 'firebrick');
    gradient.addColorStop(.55, 'indianred');
    gradient.addColorStop(1, 'firebrick');
    context.fillStyle = gradient;

    context.beginPath();
    context.arc(x, y, cityRadius, 0, 2 * Math.PI);
    context.stroke();
    context.fill();

    const fontSize = 16;
    context.strokeStyle = 'white';
    context.font = `bold ${fontSize}px system-ui`;
    context.lineWidth = 2
    context.fillStyle = 'black';
    context.textAlign = align;
    context.textBaseline = 'middle';
    const lines = name.split('\n');

    lines.forEach((line, index) => {
      context.strokeText(line, x + xOffset, y + yOffset + fontSize * index);
      context.fillText(line, x + xOffset, y + yOffset + fontSize * index);
    });

    context.restore();
  }

  const DrawRouteSegment = (context: CanvasRenderingContext2D, x: number, y: number, angle: number, color: RouteColor, carLength: number) => {
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
        context.strokeStyle = 'floralwhite';
        context.fillStyle = 'gold';
        break;
      case RouteColor.Blue:
        context.strokeStyle = 'floralwhite';
        context.fillStyle = 'royalblue';
        break;
      case RouteColor.Orange:
        context.strokeStyle = 'floralwhite';
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
    context.globalAlpha = 0.45;
    context.strokeRect(-carLength / 2, -carWidth / 2, carLength, carWidth);
    context.fillRect(-carLength / 2, -carWidth / 2, carLength, carWidth);
    context.restore();
  }

  const DrawTrain = (context: CanvasRenderingContext2D, route: Route) => {
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
        case TrainColor.Purple:
          image.src = purpleCar;
          break;
        case TrainColor.Black:
          image.src = blackCar;
          break;
      }

      context.save();
      context.translate(segment.x, segment.y);
      context.rotate(segment.angle * Math.PI / 180);
      context.drawImage(image, -route.carLength / 2, -carWidth / 2, route.carLength, carWidth);
      context.restore();
    }
  }

  return <canvas className='gameboard' ref={canvasRef} {...props} />
}