import { TrainCardColor } from '../model/TrainCardColor';
import { TrainDeckCard } from './TrainDeckCard';
import { TrainCard } from '../model/TrainCard'
import { Stack } from '@mui/material';
import { DestinationDeckCard } from './DestinationDeckCard';
import { USCities } from '../model/USCities';

export type DrawCardAreaProps = {
  faceUpTrainCards: TrainCard[];
  extraProps?: any;
}

export const DrawCardArea = (props: DrawCardAreaProps) => {
  const cards = [];

  for (const card of props.faceUpTrainCards) {
    cards.push(
      <TrainDeckCard color={card.color} faceUp={true} extraProps={{ height: '10vh', width: '10vw' }} />
    );
  }

  return (
    <Stack border='solid red' padding='1vh' spacing='1vh' {...props.extraProps}>
      <TrainDeckCard color={TrainCardColor.Red} faceUp={false} extraProps={{ height: '10vh', width: '10vw' }} />
      {cards}
      <DestinationDeckCard city1={USCities.Atlanta} city2={USCities.Billings} value={5} faceUp={false} extraProps={{ height: '10vh', width: '10vw' }} />
    </Stack>
  );
}