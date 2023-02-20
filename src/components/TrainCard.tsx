import { useEffect, useRef } from "react";
import blackCard from '../images/train-cards/card-black.png';
import blueCard from '../images/train-cards/card-blue.png';
import greenCard from '../images/train-cards/card-green.png';
import orangeCard from '../images/train-cards/card-orange.png';
import purpleCard from '../images/train-cards/card-purple.png';
import rainbowCard from '../images/train-cards/card-rainbow.png';
import redCard from '../images/train-cards/card-red.png';
import whiteCard from '../images/train-cards/card-white.png';
import yellowCard from '../images/train-cards/card-yellow.png';
import { TrainCardColor } from "../model/TrainCardColor";

export type TrainCardProps = {
  width: number;
  color: TrainCardColor;
}

export const TrainCard = (props: TrainCardProps) => {
  const aspectRatio = 1.55;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    const image = new Image();
    let imageSource = '';

    switch (props.color) {
      case TrainCardColor.Black:
        imageSource = blackCard;
        break;
      case TrainCardColor.Blue:
        imageSource = blueCard;
        break;
      case TrainCardColor.Green:
        imageSource = greenCard;
        break;
      case TrainCardColor.Orange:
        imageSource = orangeCard;
        break;
      case TrainCardColor.Purple:
        imageSource = purpleCard;
        break;
      case TrainCardColor.Rainbow:
        imageSource = rainbowCard;
        break;
      case TrainCardColor.Red:
        imageSource = redCard;
        break;
      case TrainCardColor.White:
        imageSource = whiteCard;
        break;
      case TrainCardColor.Yellow:
        imageSource = yellowCard;
        break;
    }

    image.src = imageSource;
    image.onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
  }, []);

  return <canvas className='TrainCard' ref={canvasRef} width={props.width + 'px'} height={(props.width / aspectRatio) + 'px'} />
}