import { Box } from "@mui/material";
import { TrainCard } from "../model/TrainCard";
import { TrainDeckCard } from "./TrainDeckCard";
import { GameController } from "../controllers/GameController";

export interface TrainCardStackProps {
  cards: TrainCard[];
  game: GameController;
  extraProps?: any;
}

export const TrainCardStack = (props: TrainCardStackProps) => {
  if (props.cards.length === 0) {
    return <Box {...props.extraProps} style={{ background: "rgba(255, 255, 255, 0.2)", borderRadius: "10%" }} />;
  } else if (props.cards.length === 1) {
    return <TrainDeckCard
      card={props.cards[0]}
      game={props.game}
      mode="drawDeck"
      extraProps={props.extraProps} />;
  } else {
    const newProps = { ...props.extraProps };
    newProps["style"] = { boxShadow: "0.1vb 0.1vh 0 0px black, 0.3vh 0.3vh 0 0px gray, 0.4vh 0.4vh 0 0px black, 0.6vh 0.6vh 0 0px gray", borderRadius: "10%" };
    return (
      <TrainDeckCard
        card={props.cards[0]}
        game={props.game}
        mode="drawDeck"
        extraProps={newProps} />
    );
  }
}