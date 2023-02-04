import { useEffect, useRef } from 'react';
import usMap from '../images/ttr-us-map.png';

export type GameboardProps = {
  width: string;
  height: string;
}

enum Location {
  TopLeft,
  Top,
  TopRight,
  Right,
  BottomRight,
  Bottom,
  BottomLeft,
  Left
}

export const Gameboard = (props: GameboardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    context.clearRect(0, 0, canvas.width, canvas.height);
    const image = new Image();
    image.src = usMap;
    image.onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      DrawCity(context, 120, 45, 'Vancouver', Location.TopLeft);
      DrawCity(context, 330, 25, 'Calgary', Location.Right);
      DrawCity(context, 698, 91, 'Winnipeg', Location.TopRight);
      DrawCity(context, 1005, 175, 'Sault St.\nMarie', Location.Top);
      DrawCity(context, 1264, 158, 'Montreal', Location.TopRight);
      DrawCity(context, 1353, 255, 'Boston', Location.Left);
      DrawCity(context, 116, 106, 'Seattle', Location.Left);
      DrawCity(context, 343, 177, 'Helena', Location.BottomLeft);
      DrawCity(context, 812, 191, 'Duluth', Location.BottomLeft);
      DrawCity(context, 1154, 255, 'Toronto', Location.Right);
      DrawCity(context, 724, 389, 'Omaha', Location.Right);
      DrawCity(context, 936, 347, 'Chicago', Location.BottomRight);
      DrawCity(context, 1148, 364, 'Pittsburgh', Location.Right);
      DrawCity(context, 1304, 316, 'New York', Location.BottomRight);
      DrawCity(context, 1229, 402, 'Washington', Location.Right);
      DrawCity(context, 84, 188, 'Portland', Location.BottomRight);
      DrawCity(context, 27, 430, 'San Francisco', Location.BottomRight);
      DrawCity(context, 318, 381, 'Salt Lake City', Location.TopLeft);
      DrawCity(context, 498, 437, 'Denver', Location.TopRight);
      DrawCity(context, 761, 465, 'Kansas\nCity', Location.BottomRight);
      DrawCity(context, 877, 472, 'Saint Louis', Location.BottomRight);
      DrawCity(context, 985, 545, 'Nashville', Location.Right);
      DrawCity(context, 1208, 516, 'Raleigh', Location.Right);
      DrawCity(context, 1064, 615, 'Atlanta', Location.Right);
      DrawCity(context, 1210, 608, 'Charleston', Location.Right);
      DrawCity(context, 105, 573, 'Los\nAngeles', Location.BottomLeft);
      DrawCity(context, 213, 524, 'Las Vegas', Location.BottomRight);
      DrawCity(context, 286, 614, 'Phoenix', Location.BottomLeft);
      DrawCity(context, 458, 564, 'Santa Fe', Location.TopLeft);
      DrawCity(context, 697, 588, 'Oklahoma\nCity', Location.TopLeft);
      DrawCity(context, 843, 608, 'Little Rock', Location.BottomRight);
      DrawCity(context, 450, 708, 'El Paso', Location.Bottom);
      DrawCity(context, 720, 682, 'Dallas', Location.Right);
      DrawCity(context, 762, 769, 'Houston', Location.BottomRight);
      DrawCity(context, 932, 766, 'New\nOrleans', Location.Bottom);
      DrawCity(context, 1238, 862, 'Miami', Location.BottomRight);
    }
  }, []);

  const DrawCity = (context: CanvasRenderingContext2D, x: number, y: number, name: string, nameLocation: Location) => {
    const cityRadius = 7.5;
    const textXOffset = 20;
    const textYOffset = 20;
    context.strokeStyle = 'white';
    context.lineWidth = 3
    const gradient = context.createRadialGradient(x, y, cityRadius / 4, x, y, cityRadius);
    gradient.addColorStop(0, 'black');
    gradient.addColorStop(.55, 'grey');
    gradient.addColorStop(1, 'black');
    context.fillStyle = gradient;

    context.beginPath();
    context.arc(x, y, cityRadius, 0, 2 * Math.PI);
    context.stroke();
    context.fill();

    const fontSize = 18;
    const lines = name.split('\n');
    let textX = x;
    let textY = y;

    switch (nameLocation) {
      case Location.TopLeft:
      case Location.Left:
      case Location.BottomLeft:
        context.textAlign = 'end';
        textX = x - textXOffset;
        break;
      case Location.Top:
      case Location.Bottom:
        context.textAlign = 'center';
        break;
      case Location.TopRight:
      case Location.Right:
      case Location.BottomRight:
        context.textAlign = 'start';
        textX = x + textXOffset;
        break;
    }

    switch (nameLocation) {
      case Location.TopLeft:
      case Location.Top:
      case Location.TopRight:
        context.textBaseline = 'bottom';
        textY = y - textYOffset - fontSize * (lines.length - 1);
        break;
      case Location.Left:
      case Location.Right:
        context.textBaseline = 'middle';
        textY -= fontSize / 2 * (lines.length - 1);
        break;
      case Location.BottomLeft:
      case Location.Bottom:
      case Location.BottomRight:
        context.textBaseline = 'top';
        textY = y + textYOffset;
        break;
    }

    context.font = `bold ${fontSize}px system-ui`;
    context.lineWidth = 2
    context.fillStyle = 'black';

    for (const line of lines) {
      context.strokeText(line, textX, textY);
      context.fillText(line, textX, textY);
      textY += fontSize;
    }
  }

  return <canvas className='gameboard' ref={canvasRef} {...props} />
}