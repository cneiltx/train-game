import { Stack } from '@mui/material';
import { Player } from '../model/Player';
import { TrainCardColor } from '../model/TrainCardColor';
import { USCities } from '../model/USCities';
import { DestinationDeckCard } from './DestinationDeckCard';
import { LocalPlayerSummary } from './LocalPlayerSummary';
import { TrainDeckCard } from './TrainDeckCard';

export type LocalPlayerAreaProps = {
  player: Player;
  extraProps?: any;
}

export const LocalPlayerArea = (props: LocalPlayerAreaProps) => {
  return (
    <Stack border='solid red' padding='1vh' spacing='1vh' direction='row' justifyContent='space-between' {...props.extraProps}>
      <DestinationDeckCard city1={USCities.SaultSteMarie} city2={USCities.SaltLakeCity} value={5} faceUp={true} rotate={false} extraProps={{ height: '17vh', width: '17vw' }} />
      <Stack spacing='1vh' direction='row' justifyContent='center' height='100%'>
        <TrainDeckCard color={TrainCardColor.Black} faceUp={true} rotate={true} extraProps={{ height: '17vh', width: '6.5vw' }} />
        <TrainDeckCard color={TrainCardColor.Blue} faceUp={true} rotate={true} extraProps={{ height: '17vh', width: '6.5vw' }} />
        <TrainDeckCard color={TrainCardColor.Green} faceUp={true} rotate={true} extraProps={{ height: '17vh', width: '6.5vw' }} />
        <TrainDeckCard color={TrainCardColor.Orange} faceUp={true} rotate={true} extraProps={{ height: '17vh', width: '6.5vw' }} />
        <TrainDeckCard color={TrainCardColor.Purple} faceUp={true} rotate={true} extraProps={{ height: '17vh', width: '6.5vw' }} />
        <TrainDeckCard color={TrainCardColor.Rainbow} faceUp={true} rotate={true} extraProps={{ height: '17vh', width: '6.5vw' }} />
        <TrainDeckCard color={TrainCardColor.Red} faceUp={true} rotate={true} extraProps={{ height: '17vh', width: '6.5vw' }} />
        <TrainDeckCard color={TrainCardColor.White} faceUp={true} rotate={true} extraProps={{ height: '17vh', width: '6.5vw' }} />
        <TrainDeckCard color={TrainCardColor.Yellow} faceUp={true} rotate={true} extraProps={{ height: '17vh', width: '6.5vw' }} />
      </Stack>
      <LocalPlayerSummary player={props.player} extraProps={{ height: '17vh', width: '12vw' }} />
    </Stack>
  );
}