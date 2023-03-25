import { Box } from "@mui/material";
import { DestinationCard } from "../model/DestinationCard";
import { DestinationDeckCard } from "./DestinationDeckCard";

export type DestinationCardStackProps = {
  cards: DestinationCard[];
  faceUp: boolean;
  rotate?: boolean;
  extraProps?: any;
}

export const DestinationCardStack = (props: DestinationCardStackProps) => {
  if (props.cards.length === 0) {
    return <Box {...props.extraProps} />;
  } else {
    return <DestinationDeckCard card={props.cards[0]} faceUp={props.faceUp} rotate={props.rotate} extraProps={props.extraProps} />;
  }
}