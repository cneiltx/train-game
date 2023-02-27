import { TrainCardColor } from '../model/TrainCardColor';
import { TrainDeckCard } from './TrainDeckCard';
import { TrainCard } from '../model/TrainCard'
import { Stack } from '@mui/material';

export type DrawCardAreaProps = {
  faceUpTrainCards: TrainCard[];
  extraProps?: any;
}

export const DrawCardArea = (props: DrawCardAreaProps) => {
  return (
    <Stack border='solid red' height='100%' padding={1} spacing={1} alignItems='flex-start' {...props.extraProps}>
      <TrainDeckCard color={TrainCardColor.Red} faceUp={false} extraProps={{ height: '12%' }} />
      <TrainDeckCard color={TrainCardColor.Red} faceUp={true} extraProps={{ height: '12%' }} />
      <TrainDeckCard color={TrainCardColor.Red} faceUp={true} extraProps={{ height: '12%' }} />
      <TrainDeckCard color={TrainCardColor.Red} faceUp={true} extraProps={{ height: '12%' }} />
      <TrainDeckCard color={TrainCardColor.Red} faceUp={true} extraProps={{ height: '12%' }} />
      <TrainDeckCard color={TrainCardColor.Red} faceUp={true} extraProps={{ height: '12%' }} />
    </Stack>
  );
}