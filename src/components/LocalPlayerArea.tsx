import { Box } from '@mui/material';
import { Player } from '../model/Player';
import { GameControls } from './GameControls';
import { LocalDestinationCards } from './LocalDestinationCards';
import { LocalTrainCards } from './LocalTrainCards';

export type LocalPlayerAreaProps = {
  player: Player;
  extraProps?: any;
}

export const LocalPlayerArea = (props: LocalPlayerAreaProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }} {...props.extraProps}>
      <GameControls extraProps={{ height: '100%' }} />
      <LocalTrainCards cards={props.player.trainCards} />
      <LocalDestinationCards cards={props.player.destinationCards} />
    </Box >
  );
}