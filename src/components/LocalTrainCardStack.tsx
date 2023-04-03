import { Box, Stack } from '@mui/material';
import { TrainCard } from '../model/TrainCard';
import { TrainDeckCard } from './TrainDeckCard';

export type LocalTrainCardStackProps = {
  cards: TrainCard[];
  extraProps?: any;
}

export const LocalTrainCardStack = (props: LocalTrainCardStackProps) => {
  return (
    <Stack direction='row' {...props.extraProps}>
      <TrainDeckCard card={props.cards[0]} faceUp={true} extraProps={{ height: '5vh' }} />
      <Box paddingLeft='1vh' sx={{ font: 'bold 3vh system-ui' }}>{props.cards.length}</Box>
    </Stack >
  );
}