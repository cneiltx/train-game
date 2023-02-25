import { TrainCardColor } from '../model/TrainCardColor';
import './DrawCardArea.css';
import { TrainDeckCard } from './TrainDeckCard';
import { TrainCard } from '../model/TrainCard'
import { Stack } from '@mui/material';

export type DrawCardAreaProps = {
  faceUpTrainCards: TrainCard[];
}

export const DrawCardArea = (props: DrawCardAreaProps) => {
  return (
    <Stack padding={1} spacing={1}>
      <TrainDeckCard color={TrainCardColor.Red} faceUp={false} />
      <TrainDeckCard color={TrainCardColor.Red} faceUp={true} />
      <TrainDeckCard color={TrainCardColor.Red} faceUp={true} />
      <TrainDeckCard color={TrainCardColor.Red} faceUp={true} />
      <TrainDeckCard color={TrainCardColor.Red} faceUp={true} />
      <TrainDeckCard color={TrainCardColor.Red} faceUp={true} />
    </Stack>
  );
}