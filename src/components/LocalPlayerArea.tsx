import { Box } from '@mui/material';
import { Player } from '../model/Player';
import { GameControls } from './GameControls';
import { LocalDestinationCards } from './LocalDestinationCards';
import { LocalTrainCards } from './LocalTrainCards';
import { USCity } from '../model/USCity';
import { DestinationCard } from '../model/DestinationCard';

export type LocalPlayerAreaProps = {
  player: Player;
  cities: USCity[];
  onSelectedDestinationCardChange?: (card: DestinationCard | null) => void;
  extraProps?: any;
}

export const LocalPlayerArea = (props: LocalPlayerAreaProps) => {

  const handleSelectedDestinationCardChange = (card: DestinationCard | null) => {
    if (props.onSelectedDestinationCardChange) {
      props.onSelectedDestinationCardChange(card);
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }} {...props.extraProps}>
      <GameControls extraProps={{ height: '100%' }} />
      <LocalTrainCards cards={props.player.trainCards} />
      <LocalDestinationCards cards={props.player.destinationCards} cities={props.cities} onSelectedCardChange={handleSelectedDestinationCardChange} />
    </Box >
  );
}