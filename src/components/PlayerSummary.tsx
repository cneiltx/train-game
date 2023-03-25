import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { Player } from "../model/Player";
import { TrainColor } from "../model/TrainColor";
import destinationCardBack from '../images/destination-cards/card-back.png';
import trainCardBack from '../images/train-cards/card-back.png';
import blackCar from '../images/train-cars/car-black.png';
import blueCar from '../images/train-cars/car-blue.png';
import greenCar from '../images/train-cars/car-green.png';
import redCar from '../images/train-cars/car-red.png';
import yellowCar from '../images/train-cars/car-yellow.png';

export type PlayerSummaryProps = {
  player: Player;
  extraProps?: any;
}

export const PlayerSummary = (props: PlayerSummaryProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const avatarImage = new Image();
  const trainCardImage = new Image();
  const destinationCardImage = new Image();
  const trainCar = new Image();
  const referenceWidth = 300;
  const referenceHeight = 150;
  let color = '';

  useEffect(() => {
    avatarImage.src = props.player.avatarImageSrc;
    destinationCardImage.src = destinationCardBack;
    trainCardImage.src = trainCardBack;

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
    trainCardImage.onload = () => {
      onResize();
    }
    destinationCardImage.onload = () => {
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
    DrawName(context);
    DrawScore(context);
    DrawTrainCount(context);
    DrawTrainCardCount(context);
    DrawDestinationCardCount(context);
  }

  const DrawBackground = (context: CanvasRenderingContext2D) => {
    context.clearRect(0, 0, referenceWidth, referenceHeight);
    context.fillStyle = color;
    context.fillRect(0, 0, referenceWidth, referenceHeight * 0.4);
  }

  const DrawAvatar = (context: CanvasRenderingContext2D) => {
    context.save();
    context.beginPath();
    context.arc(referenceHeight * 0.5, referenceHeight * 0.5, referenceHeight * 0.4, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();
    context.drawImage(avatarImage, referenceHeight * 0.1, referenceHeight * 0.1, referenceHeight * 0.8, referenceHeight * 0.8);
    context.restore();
  }

  const DrawName = (context: CanvasRenderingContext2D) => {
    context.font = '1.5em system-ui';
    context.fillStyle = 'white';
    context.textAlign = 'left';
    context.textBaseline = 'middle';
    const x = referenceHeight * 0.95;
    const padding = referenceWidth * 0.02;
    const line1 = props.player.name.trim().split(' ');
    const line2: string[] = [];

    while (line1.length > 1 && context.measureText(line1.join(' ')).width > referenceWidth - x - padding) {
      line2.unshift(line1.pop()!);
    }

    if (line2.length > 0) {
      context.fillText(line1.join(' '), x, referenceHeight * 0.12);
      context.fillText(line2.join(' '), x, referenceHeight * 0.29);
    } else {
      context.fillText(line1.join(' '), x, referenceHeight * 0.21);
    }
  }

  const DrawScore = (context: CanvasRenderingContext2D) => {
    context.fillStyle = color;
    context.beginPath();
    context.roundRect(referenceHeight * 0.25, referenceHeight * 0.75, referenceHeight * 0.5, referenceHeight * 0.25, referenceHeight * 0.08);
    context.fill();
    context.fillStyle = 'white';
    context.font = 'bold 1.5em system-ui';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(props.player.points.toString(), referenceHeight * 0.5, referenceHeight * 0.89);
  }

  const DrawTrainCount = (context: CanvasRenderingContext2D) => {
    context.strokeStyle = color;
    context.fillStyle = 'white';
    context.lineWidth = 4;
    context.beginPath();
    context.arc(referenceHeight, referenceHeight * 0.75, referenceHeight * 0.2, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
    context.drawImage(trainCar, referenceHeight * 0.85, referenceHeight * 0.63);
    context.fillStyle = 'black';
    context.font = 'bold 1.2em system-ui';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(props.player.trains.toString(), referenceHeight, referenceHeight * 0.84);
  }

  const DrawTrainCardCount = (context: CanvasRenderingContext2D) => {
    context.drawImage(trainCardImage, referenceHeight * 1.35, referenceHeight * 0.475, referenceHeight * 0.2 * trainCardImage.width / trainCardImage.height, referenceHeight * 0.2);
    context.fillStyle = 'white';
    context.font = 'bold 1.2em system-ui';
    context.textAlign = 'left';
    context.textBaseline = 'middle';
    context.fillText(props.player.trainCards.length.toString(), referenceHeight * 1.72, referenceHeight * 0.58);
  }

  const DrawDestinationCardCount = (context: CanvasRenderingContext2D) => {
    context.drawImage(destinationCardImage, referenceHeight * 1.35, referenceHeight * 0.725, referenceHeight * 0.2 * destinationCardImage.width / destinationCardImage.height, referenceHeight * 0.2);
    context.fillStyle = 'white';
    context.font = 'bold 1.2em system-ui';
    context.textAlign = 'left';
    context.textBaseline = 'middle';
    context.fillText(props.player.destinationCards.length.toString(), referenceHeight * 1.72, referenceHeight * 0.835);
  }

  return (
    <Box border='solid green' {...props.extraProps} display='flex' justifyContent='center' alignItems='center' >
      <Box border='solid orange' component='canvas' ref={canvasRef} />
    </Box>
  );
}