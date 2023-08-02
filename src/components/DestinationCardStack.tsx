import { Box } from "@mui/material";
import { DestinationCard } from "../model/DestinationCard";
import { DestinationDeckCard } from "./DestinationDeckCard";
import { GameController } from "../controllers/GameController";

export interface DestinationCardStackProps {
  cards: DestinationCard[];
  game: GameController;
  onClick?: (card: DestinationCard[]) => void;
  extraProps?: any;
}

export const DestinationCardStack = (props: DestinationCardStackProps) => {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick(props.cards.slice(0, 3));
    }
  }

  if (props.cards.length === 0) {
    return <Box {...props.extraProps} style={{ background: "rgba(255, 255, 255, 0.2)", borderRadius: "10%" }} />;
  } else if (props.cards.length === 1) {
    return (
      <DestinationDeckCard
        card={props.cards[0]}
        game={props.game}
        mode="drawDeck"
        onClick={handleClick}
        extraProps={props.extraProps} />
    );
  } else {
    const newProps = { ...props.extraProps };
    newProps["style"] = { boxShadow: "0.1vb 0.1vh 0 0px black, 0.3vh 0.3vh 0 0px gray, 0.4vh 0.4vh 0 0px black, 0.6vh 0.6vh 0 0px gray", borderRadius: "10%" };
    return (
      <DestinationDeckCard
        card={props.cards[0]}
        game={props.game}
        mode="drawDeck"
        onClick={handleClick}
        extraProps={newProps} />
    );
  }
}