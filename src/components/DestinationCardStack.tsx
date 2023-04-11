import { Box } from "@mui/material";
import { DestinationCard } from "../model/DestinationCard";
import { DestinationDeckCard } from "./DestinationDeckCard";
import { USCity } from "../model/USCity";

export type DestinationCardStackProps = {
  cards: DestinationCard[];
  faceUp: boolean;
  cities: USCity[];
  canClick?: boolean;
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
    return <Box {...props.extraProps} />;
  } else if (props.cards.length === 1) {
    return (
      <DestinationDeckCard
        card={props.cards[0]}
        cities={props.cities}
        faceUp={props.faceUp}
        canClick={props.canClick}
        onClick={handleClick}
        extraProps={props.extraProps} />
    );
  } else {
    return (
      <Box sx={{ boxShadow: '0.1vh 0.1vh 0 0px black, 0.3vh 0.3vh 0 0px gray, 0.4vh 0.4vh 0 0px black, 0.6vh 0.6vh 0 0px gray', borderRadius: '10%' }}>
        <DestinationDeckCard
          card={props.cards[0]}
          cities={props.cities}
          faceUp={props.faceUp}
          canClick={props.canClick}
          onClick={handleClick}
          extraProps={props.extraProps} />
      </Box>
    );
  }
}