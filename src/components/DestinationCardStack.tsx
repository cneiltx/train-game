import { Box } from "@mui/material";
import { DestinationCard } from "../model/DestinationCard";
import { DestinationDeckCard } from "./DestinationDeckCard";

export type DestinationCardStackProps = {
  cards: DestinationCard[];
  faceUp: boolean;
  extraProps?: any;
}

export const DestinationCardStack = (props: DestinationCardStackProps) => {
  if (props.cards.length === 0) {
    return <Box {...props.extraProps} />;
  } else if (props.cards.length === 1) {
    return <DestinationDeckCard card={props.cards[0]} faceUp={props.faceUp} extraProps={props.extraProps} />;
  } else {
    return (
      <Box sx={{ boxShadow: '0.1vh 0.1vh 0 0px black, 0.3vh 0.3vh 0 0px gray, 0.4vh 0.4vh 0 0px black, 0.6vh 0.6vh 0 0px gray', borderRadius: '6px' }}>
        <DestinationDeckCard card={props.cards[0]} faceUp={props.faceUp} extraProps={props.extraProps} />
      </Box>
    );
  }
}