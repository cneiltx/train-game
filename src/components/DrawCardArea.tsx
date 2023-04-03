import { TrainDeckCard } from './TrainDeckCard';
import { TrainCard } from '../model/TrainCard'
import { Stack } from '@mui/material';
import { TrainCardStack } from './TrainCardStack';
import { DestinationCardStack } from './DestinationCardStack';
import { DestinationCard } from '../model/DestinationCard';

export type DrawCardAreaProps = {
  trainCardDeck: TrainCard[];
  faceUpTrainCards: TrainCard[];
  destinationCardDeck: DestinationCard[];
  extraProps?: any;
}

export const DrawCardArea = (props: DrawCardAreaProps) => {
  const cards = [];

  for (const card of props.faceUpTrainCards) {
    cards.push(
      <TrainDeckCard card={card} faceUp={true} extraProps={{ height: '9vh' }} />
    );
  }

  return (
    <Stack boxShadow='inset 0 0 0 3px darkblue' padding='1.5vh' spacing='1.5vh' {...props.extraProps}>
      <TrainCardStack cards={props.trainCardDeck} faceUp={false} extraProps={{ height: '9vh' }} />
      {cards}
      <DestinationCardStack cards={props.destinationCardDeck} faceUp={false} extraProps={{ height: '9vh' }} />
    </Stack>
  );
}