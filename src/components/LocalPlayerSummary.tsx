import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { Player } from "../model/Player";
import { TrainColor } from "../model/TrainColor";
import blackCar from '../images/train-cars/car-black.png';
import blueCar from '../images/train-cars/car-blue.png';
import greenCar from '../images/train-cars/car-green.png';
import redCar from '../images/train-cars/car-red.png';
import yellowCar from '../images/train-cars/car-yellow.png';

export type LocalPlayerSummaryProps = {
  player: Player;
  extraProps?: any;
}

export const LocalPlayerSummary = (props: LocalPlayerSummaryProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const avatarImage = new Image();
  const trainCar = new Image();
  const aspectRatio = 1.5;
  let color = '';

  useEffect(() => {
    avatarImage.src = props.player.avatarImageSrc;

    switch (props.player.color) {
      case TrainColor.Black:
        color = 'black';
        trainCar.src = blackCar;
        break;
      case TrainColor.Blue:
        color = 'darkblue';
        trainCar.src = blueCar;
        break;
      case TrainColor.Green:
        color = 'green';
        trainCar.src = greenCar;
        break;
      case TrainColor.Red:
        color = 'firebrick';
        trainCar.src = redCar;
        break;
      case TrainColor.Yellow:
        color = 'gold';
        trainCar.src = yellowCar;
        break;
    }

    window.addEventListener('resize', onResize);

    avatarImage.onload = () => {
      onResize();
    }
    trainCar.onload = () => {
      onResize();
    }

    return () => window.removeEventListener('resize', onResize);
  }, []);

  const onResize = () => {
    const canvas = canvasRef.current!;
    canvas.height = canvas.clientHeight;
    canvas.width = canvas.clientHeight * aspectRatio;
    DrawContent();
  }

  const DrawContent = () => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    DrawBackground(context, canvas.width, canvas.height);
    DrawAvatar(context, canvas.width, canvas.height);
    DrawName(context, canvas.width, canvas.height);
    DrawScore(context, canvas.width, canvas.height);
    DrawTrainCount(context, canvas.width, canvas.height);
  }

  const DrawBackground = (context: CanvasRenderingContext2D, width: number, height: number) => {
    context.clearRect(0, 0, width, height);
    context.fillStyle = color;
    context.fillRect(0, 0, width, height * 0.4);
  }

  const DrawAvatar = (context: CanvasRenderingContext2D, width: number, height: number) => {
    context.save();
    context.beginPath();
    context.arc(height * 0.5, height * 0.5, height * 0.4, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();
    context.drawImage(avatarImage, height * 0.1, height * 0.1, height * 0.8, height * 0.8);
    context.restore();
  }

  const DrawName = (context: CanvasRenderingContext2D, width: number, height: number) => {
    context.font = '1em system-ui';
    context.fillStyle = 'white';
    context.textAlign = 'left';
    context.textBaseline = 'middle';
    const x = height * 0.95;
    const padding = width * 0.02;
    const line1 = props.player.name.trim().split(' ');
    const line2: string[] = [];

    while (line1.length > 1 && context.measureText(line1.join(' ')).width > width - x - padding) {
      line2.unshift(line1.pop()!);
    }

    if (line2.length > 0) {
      context.fillText(line1.join(' '), x, height * 0.12);
      context.fillText(line2.join(' '), x, height * 0.29);
    } else {
      context.fillText(line1.join(' '), x, height * 0.21);
    }
  }

  const DrawScore = (context: CanvasRenderingContext2D, width: number, height: number) => {
    context.fillStyle = color;
    context.beginPath();
    context.roundRect(height * 0.3, height * 0.75, height * 0.4, height * 0.25, height * 0.05);
    context.fill();
    context.fillStyle = 'white';
    context.font = 'bold 1em system-ui';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(props.player.points.toString(), height * 0.5, height * 0.88);
  }

  const DrawTrainCount = (context: CanvasRenderingContext2D, width: number, height: number) => {
    context.strokeStyle = color;
    context.fillStyle = 'white';
    context.lineWidth = 2;
    context.beginPath();
    context.arc(height, height * 0.75, 24, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
    context.drawImage(trainCar, height * 0.775, height * 0.61);
    context.fillStyle = 'black';
    context.font = 'bold 1em system-ui';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(props.player.trains.toString(), height, height * 0.85);
  }

  return (
    <Box border='solid green' component='canvas' ref={canvasRef} {...props.extraProps} />
  );
}