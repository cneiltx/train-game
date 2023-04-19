import { Box } from '@mui/material';
import { GameControls } from './GameControls';
import { LocalDestinationCards } from './LocalDestinationCards';
import { LocalTrainCards } from './LocalTrainCards';
import { DestinationCard } from '../model/DestinationCard';
import { GameController } from '../controllers/GameController';

export interface LocalPlayerAreaProps {
  game: GameController;
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
      <GameControls key='gameControls' extraProps={{ height: '100%', width: '39vh' }} />
      <LocalTrainCards key='trainCards' game={props.game} />
      <LocalDestinationCards key='destinationCards' game={props.game} onSelectedCardChange={handleSelectedDestinationCardChange} />
    </Box >
  );
}