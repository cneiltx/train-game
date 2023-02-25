import { useEffect, useRef, useState } from "react";
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

export type TrainDeckCardProps = {
  color: TrainCardColor;
  faceUp: boolean;
}

export const TrainDeckCard = (props: TrainDeckCardProps) => {
  const aspectRatio = 1.55;
  let imageSource;

  if (props.faceUp) {
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
  } else {
    imageSource = cardBack;
  }

  return (
    <Box component='img' maxWidth='100%' maxHeight='100%' src={imageSource} sx={{ aspectRatio: aspectRatio }} />
  );
}