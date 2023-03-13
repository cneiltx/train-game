import { Stack } from '@mui/material';
import { TrainCardColor } from '../model/TrainCardColor';
import { USCities } from '../model/USCities';
import { DestinationDeckCard } from './DestinationDeckCard';
import { TrainDeckCard } from './TrainDeckCard';

export type ActivePlayerAreaProps = {
  extraProps?: any;
}

export const ActivePlayerArea = (props: ActivePlayerAreaProps) => {
  return (
    <Stack border='solid red' padding={1} spacing={1} direction='row' {...props.extraProps}>
      <DestinationDeckCard city1={USCities.SaultSteMarie} city2={USCities.SaltLakeCity} value={5} faceUp={true} rotate={false} extraProps={{ height: '100%' }} />
      <TrainDeckCard color={TrainCardColor.Red} faceUp={true} rotate={true} extraProps={{ height: '100%' }} />
    </Stack>
  );
}