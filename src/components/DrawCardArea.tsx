import { TrainDeckCard } from './TrainDeckCard';
import { TrainCard } from '../model/TrainCard'
import { Stack } from '@mui/material';
import { TrainCardStack } from './TrainCardStack';
import { DestinationCardStack } from './DestinationCardStack';
import { DestinationCard } from '../model/DestinationCard';
import { isPropertyAccessOrQualifiedName } from 'typescript';

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
      <TrainDeckCard card={card} faceUp={true} extraProps={{ height: '10vh', width: '10vw' }} />
    );
  }

  return (
    <Stack border='solid red' padding='1vh' spacing='1vh' {...props.extraProps}>
      <TrainCardStack cards={props.trainCardDeck} faceUp={false} extraProps={{ height: '10vh', width: '10vw' }} />
      {cards}
      <DestinationCardStack cards={props.destinationCardDeck} faceUp={false} extraProps={{ height: '10vh', width: '10vw' }} />
    </Stack>
  );
}