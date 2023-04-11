import { TrainDeckCard } from './TrainDeckCard';
import { TrainCard } from '../model/TrainCard'
import { Box, Stack } from '@mui/material';
import { TrainCardStack } from './TrainCardStack';
import { DestinationCardStack } from './DestinationCardStack';
import { DestinationCard } from '../model/DestinationCard';
import { USCity } from '../model/USCity';
import { useEffect } from 'react';

export type DrawCardAreaProps = {
  trainCardDeck: TrainCard[];
  faceUpTrainCards: (TrainCard | null)[];
  destinationCardDeck: DestinationCard[];
  cities: USCity[];
  canDrawTrainCards?: boolean
  canDrawDestinationCards?: boolean;
  onDrawTrainCardFromDeck?: (card: TrainCard) => void;
  onDrawFaceUpTrainCard?: (card: TrainCard) => void;
  onDrawDestinationCards?: (cards: DestinationCard[]) => void;
  extraProps?: any;
}

export const DrawCardArea = (props: DrawCardAreaProps) => {
  useEffect(() => {
    console.log('changed');
  }, [props.faceUpTrainCards]);

  const cards = [];
  let index = 0;

  for (const card of props.faceUpTrainCards) {
    if (card) {
      cards.push(
        <TrainDeckCard
          key={index}
          card={card}
          faceUp={true}
          canClick={props.canDrawTrainCards}
          onClick={props.onDrawFaceUpTrainCard}
          extraProps={{ height: '9vh' }} />
      );
    } else {
      cards.push(<Box key={index} height='9vh' />);
    }
    index++;
  }

  return (
    <Stack boxShadow='inset 0 0 0 3px darkblue' padding='1.5vh' spacing='1.5vh' {...props.extraProps}>
      <TrainCardStack
        cards={props.trainCardDeck}
        faceUp={false}
        canClick={props.canDrawTrainCards}
        onClick={props.onDrawTrainCardFromDeck}
        extraProps={{ height: '9vh' }} />
      {cards}
      <DestinationCardStack
        cards={props.destinationCardDeck}
        cities={props.cities}
        faceUp={false}
        canClick={props.canDrawDestinationCards}
        onClick={props.onDrawDestinationCards}
        extraProps={{ height: '9vh' }} />
    </Stack>
  );
}