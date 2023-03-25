import { Box } from "@mui/material";
import { TrainCard } from "../model/TrainCard";
import { TrainDeckCard } from "./TrainDeckCard";

export type TrainCardStackProps = {
  cards: TrainCard[];
  faceUp: boolean;
  rotate?: boolean;
  showCount?: boolean;
  extraProps?: any;
}

export const TrainCardStack = (props: TrainCardStackProps) => {
  if (props.cards.length === 0) {
    return <Box {...props.extraProps} />;
  } else {
    return <TrainDeckCard card={props.cards[0]} faceUp={props.faceUp} rotate={props.rotate} count={props.showCount ? props.cards.length : undefined} extraProps={props.extraProps} />;
  }
}