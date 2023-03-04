import blackCard from '../images/train-cards/card-black.png';
import blueCard from '../images/train-cards/card-blue.png';
import greenCard from '../images/train-cards/card-green.png';
import orangeCard from '../images/train-cards/card-orange.png';
import purpleCard from '../images/train-cards/card-purple.png';
import rainbowCard from '../images/train-cards/card-rainbow.png';
import redCard from '../images/train-cards/card-red.png';
import whiteCard from '../images/train-cards/card-white.png';
import yellowCard from '../images/train-cards/card-yellow.png';
import cardBack from '../images/train-cards/card-back.png';
import { TrainCardColor } from "../model/TrainCardColor";
import { Box } from "@mui/material";
import { useEffect, useRef } from 'react';

export type TrainDeckCardProps = {
  color: TrainCardColor;
  faceUp: boolean;
  rotate?: boolean;
  extraProps?: any;
}

export const TrainDeckCard = (props: TrainDeckCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const image = new Image();

  useEffect(() => {
    if (props.faceUp) {
      switch (props.color) {
        case TrainCardColor.Black:
          image.src = blackCard;
          break;
        case TrainCardColor.Blue:
          image.src = blueCard;
          break;
        case TrainCardColor.Green:
          image.src = greenCard;
          break;
        case TrainCardColor.Orange:
          image.src = orangeCard;
          break;
        case TrainCardColor.Purple:
          image.src = purpleCard;
          break;
        case TrainCardColor.Rainbow:
          image.src = rainbowCard;
          break;
        case TrainCardColor.Red:
          image.src = redCard;
          break;
        case TrainCardColor.White:
          image.src = whiteCard;
          break;
        case TrainCardColor.Yellow:
          image.src = yellowCard;
          break;
      }
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
    canvas.height = canvas.clientHeight;

    if (props.rotate) {
      canvas.width = canvas.clientHeight * image.height / image.width;
      DrawCard(canvas.clientHeight / image.width);
    } else {
      canvas.width = canvas.clientHeight * image.width / image.height;
      DrawCard(canvas.clientHeight / image.height);
    }
  }

  const DrawCard = (scale: number) => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.translate(canvas.width / 2, canvas.height / 2);
    if (props.rotate) {
      context.rotate(-90 * Math.PI / 180);
    }
    context.scale(scale, scale);
    context.drawImage(image, -image.width / 2, -image.height / 2);
    context.restore();
  }

  return <Box component='canvas' ref={canvasRef} {...props.extraProps} />;
}