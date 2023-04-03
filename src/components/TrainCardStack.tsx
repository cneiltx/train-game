import { Box } from "@mui/material";
import { TrainCard } from "../model/TrainCard";
import { TrainDeckCard } from "./TrainDeckCard";

export type TrainCardStackProps = {
  cards: TrainCard[];
  faceUp: boolean;
  extraProps?: any;
}

export const TrainCardStack = (props: TrainCardStackProps) => {
  if (props.cards.length === 0) {
    return <Box {...props.extraProps} />;
  } else if (props.cards.length === 1) {
    return <TrainDeckCard card={props.cards[0]} faceUp={props.faceUp} extraProps={props.extraProps} />;
  } else {
    return (
      <Box sx={{ boxShadow: '0.1vb 0.1vh 0 0px black, 0.3vh 0.3vh 0 0px gray, 0.4vh 0.4vh 0 0px black, 0.6vh 0.6vh 0 0px gray', borderRadius: '10%' }}>
        <TrainDeckCard card={props.cards[0]} faceUp={props.faceUp} extraProps={props.extraProps} />
      </Box>
    );
  }
}