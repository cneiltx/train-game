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
import { TrainCard } from '../model/TrainCard';

export type TrainDeckCardProps = {
  card: TrainCard;
  faceUp: boolean;
  rotate?: boolean;
  count?: number;
  extraProps?: any;
}

export const TrainDeckCard = (props: TrainDeckCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const image = new Image();

  useEffect(() => {
    if (props.faceUp) {
      switch (props.card.color) {
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
    let scale = 1;

    if (props.rotate) {
      if (canvas.parentElement!.clientWidth / image.height > canvas.parentElement!.clientHeight / image.width) {
        canvas.height = canvas.parentElement!.clientHeight - (canvas.offsetHeight - canvas.clientHeight);
        canvas.width = canvas.height * image.height / image.width;
        scale = canvas.height / image.width;
      } else {
        canvas.width = canvas.parentElement!.clientWidth - (canvas.offsetWidth - canvas.clientWidth);
        canvas.height = canvas.width * image.width / image.height;
        scale = canvas.width / image.height;
      }
    } else {
      if (canvas.parentElement!.clientWidth / image.width > canvas.parentElement!.clientHeight / image.height) {
        canvas.height = canvas.parentElement!.clientHeight - (canvas.offsetHeight - canvas.clientHeight);
        canvas.width = canvas.height * image.width / image.height;
        scale = canvas.height / image.height;
      } else {
        canvas.width = canvas.parentElement!.clientWidth - (canvas.offsetWidth - canvas.clientWidth);
        canvas.height = canvas.width * image.height / image.width;
        scale = canvas.width / image.width;
      }
    }

    DrawCard(scale);
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

    if (props.count) {
      context.scale(scale, scale);
      context.font = `bold 40px system-ui`;
      context.strokeStyle = 'black';
      context.lineWidth = 6;
      context.fillStyle = 'white';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      const text = 'x' + props.count;
      context.strokeText(text, canvas.width * 0.5 / scale, canvas.height * 0.8 / scale);
      context.fillText(text, canvas.width * 0.5 / scale, canvas.height * 0.8 / scale);
    }
  }

  return (
    <Box border='solid green' {...props.extraProps} display='flex' justifyContent='center' alignItems='center' >
      <Box border='solid orange' component='canvas' ref={canvasRef} />
    </Box>
  );
}