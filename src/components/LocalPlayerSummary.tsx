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
  const referenceWidth = 300;
  const referenceHeight = 215;
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
    const context = canvas.getContext('2d')!;
    let scale = 1;

    if ((canvas.parentElement!.clientWidth - (canvas.offsetWidth - canvas.clientWidth)) /
      (canvas.parentElement!.clientHeight - (canvas.offsetHeight - canvas.clientHeight)) > referenceWidth / referenceHeight) {
      canvas.height = canvas.parentElement!.clientHeight - (canvas.offsetHeight - canvas.clientHeight);
      canvas.width = canvas.height * referenceWidth / referenceHeight;
      scale = canvas.height / referenceHeight;
    } else {
      canvas.width = canvas.parentElement!.clientWidth - (canvas.offsetWidth - canvas.clientWidth);
      canvas.height = canvas.width * referenceHeight / referenceWidth;
      scale = canvas.width / referenceWidth;
    }

    context.scale(scale, scale);
    DrawBackground(context);
    DrawAvatar(context);
    DrawScore(context);
    DrawTrainCount(context);
  }

  const DrawBackground = (context: CanvasRenderingContext2D) => {
    context.clearRect(0, 0, referenceWidth, referenceHeight);
    context.fillStyle = color;
    context.fillRect(0, 0, referenceWidth, referenceHeight * 0.4);
  }

  const DrawAvatar = (context: CanvasRenderingContext2D) => {
    context.save();
    context.beginPath();
    context.arc(referenceHeight * 0.85, referenceHeight * 0.5, referenceHeight * 0.4, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();
    context.drawImage(avatarImage, referenceHeight * 0.45, referenceHeight * 0.1, referenceHeight * 0.8, referenceHeight * 0.8);
    context.restore();
  }

  const DrawScore = (context: CanvasRenderingContext2D) => {
    context.fillStyle = color;
    context.beginPath();
    context.roundRect(referenceHeight * 0.6, referenceHeight * 0.75, referenceHeight * 0.5, referenceHeight * 0.25, referenceHeight * 0.05);
    context.fill();
    context.fillStyle = 'white';
    context.font = 'bold 2.9em system-ui';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(props.player.points.toString(), referenceHeight * 0.85, referenceHeight * 0.89);
  }

  const DrawTrainCount = (context: CanvasRenderingContext2D) => {
    context.strokeStyle = color;
    context.fillStyle = 'white';
    context.lineWidth = 6;
    context.beginPath();
    context.arc(referenceHeight * 0.35, referenceHeight * 0.75, referenceHeight * 0.2, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
    context.drawImage(trainCar, referenceHeight * 0.195, referenceHeight * 0.64, trainCar.width * 1.5, trainCar.height * 1.5);
    context.fillStyle = 'black';
    context.font = 'bold 2em system-ui';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(props.player.trains.toString(), referenceHeight * 0.35, referenceHeight * 0.84);
  }

  return (
    <Box border='solid green' {...props.extraProps} display='flex' justifyContent='center' alignItems='center' >
      <Box border='solid orange' component='canvas' ref={canvasRef} />
    </Box>
  );
}