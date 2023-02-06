import { useEffect, useRef } from 'react';
import usMap from '../images/ttr-us-map.png';
import { Color } from '../model/Color';
import { GameMap } from '../model/GameMap';

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
      DrawPlaceholders(context);
      DrawCities(context);
    }
  }, []);

  const DrawPlaceholders = (context: CanvasRenderingContext2D) => {
    for (const route of map.routes) {
      for (const position of route.positions) {
        DrawPlaceholder(context, position.x, position.y, position.angle, route.color);
      }
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
    DrawCity(context, 432, 215, 'Billings', -20, 12, 'right'); // substituted for Helena
    DrawCity(context, 799, 266, 'Minneapolis', 15, 0, 'left'); // substituted for Duluth
    DrawCity(context, 1154, 255, 'Toronto', 15, 0, 'left');
    DrawCity(context, 724, 389, 'Omaha', 15, 0, 'left');
    DrawCity(context, 936, 347, 'Chicago', 15, 0, 'left');
    DrawCity(context, 1148, 364, 'Pittsburgh', 15, 0, 'left');
    DrawCity(context, 1304, 316, 'New York', 15, 0, 'left');
    DrawCity(context, 1229, 402, 'Washington', 15, 0, 'left');
    DrawCity(context, 84, 188, 'Portland', -12, -10, 'right');
    DrawCity(context, 27, 430, 'San Francisco', 30, 30, 'left');
    DrawCity(context, 318, 381, 'Salt Lake City', -45, -18, 'right');
    DrawCity(context, 498, 437, 'Denver', 15, 0, 'left');
    DrawCity(context, 761, 465, 'Kansas\nCity', 15, 0, 'left');
    DrawCity(context, 877, 472, 'Saint Louis', 15, 0, 'left');
    DrawCity(context, 985, 545, 'Nashville', 15, 0, 'left');
    DrawCity(context, 1208, 516, 'Raleigh', 15, 0, 'left');
    DrawCity(context, 1064, 615, 'Atlanta', 15, 0, 'left');
    DrawCity(context, 1210, 608, 'Charleston', 15, 0, 'left');
    DrawCity(context, 105, 573, 'Los Angeles', 5, 20, 'right');
    DrawCity(context, 213, 524, 'Las Vegas', -5, 20, 'left');
    DrawCity(context, 286, 614, 'Phoenix', 15, 0, 'left');
    DrawCity(context, 458, 564, 'Santa Fe', 15, 0, 'left');
    DrawCity(context, 697, 588, 'Oklahoma\nCity', 15, 0, 'left');
    DrawCity(context, 843, 608, 'Little Rock', 15, 0, 'left');
    DrawCity(context, 450, 708, 'El Paso', 15, 0, 'left');
    DrawCity(context, 720, 682, 'Dallas', 15, 0, 'left');
    DrawCity(context, 762, 769, 'Houston', 15, 0, 'left');
    DrawCity(context, 932, 766, 'New\nOrleans', 15, 0, 'left');
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

  const DrawPlaceholder = (context: CanvasRenderingContext2D, x: number, y: number, angle: number, color: Color) => {
    context.save();
    const width = 45;
    const height = 15;

    switch (color) {
      case Color.Grey:
        context.strokeStyle = 'floralwhite';
        context.fillStyle = 'dimgrey';
        break;
      case Color.Black:
        context.strokeStyle = 'floralwhite';
        context.fillStyle = 'black';
        break;
      case Color.White:
        context.strokeStyle = 'dimgrey';
        context.fillStyle = 'floralwhite';
        break;
      case Color.Red:
        context.strokeStyle = 'floralwhite';
        context.fillStyle = 'firebrick';
        break;
      case Color.Yellow:
        context.strokeStyle = 'floralwhite';
        context.fillStyle = 'gold';
        break;
      case Color.Blue:
        context.strokeStyle = 'floralwhite';
        context.fillStyle = 'royalblue';
        break;
      case Color.Orange:
        context.strokeStyle = 'floralwhite';
        context.fillStyle = 'orange';
        break;
      case Color.Green:
        context.strokeStyle = 'floralwhite';
        context.fillStyle = 'mediumseagreen';
        break;
      case Color.Pink:
        context.strokeStyle = 'floralwhite';
        context.fillStyle = 'palevioletred';
        break;
    }

    context.lineWidth = 4
    context.translate(x, y);
    context.rotate(angle * Math.PI / 180);
    context.globalAlpha = 0.65;
    context.strokeRect(-width / 2, -height / 2, width, height);
    context.fillRect(-width / 2, -height / 2, width, height);
    context.restore();
  }

  return <canvas className='gameboard' ref={canvasRef} {...props} />
}