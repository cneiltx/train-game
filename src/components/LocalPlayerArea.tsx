import { Box, Stack } from '@mui/material';
import { Player } from '../model/Player';
import { DestinationDeckCard } from './DestinationDeckCard';
import { GameControls } from './GameControls';
import tileRed from '../images/backgrounds/tile-red.jpg';

export type LocalPlayerAreaProps = {
  player: Player;
  extraProps?: any;
}

export const LocalPlayerArea = (props: LocalPlayerAreaProps) => {
  const destinationCards = [];

  for (const card of props.player.destinationCards) {
    destinationCards.push(
      <DestinationDeckCard card={card} faceUp={true} extraProps={{ width: '100%', height: '100%' }} />
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }} {...props.extraProps}>
      <GameControls extraProps={{ height: '100%' }} />
      <Stack style={{ backgroundImage: `url(${tileRed})`, backgroundRepeat: 'repeat' }} boxShadow='inset 0 0 5px 2px gold' padding='1.5vh' direction='row' spacing='1vh' height='100%' width='100%'>
        {destinationCards}
      </Stack>
    </Box >
  );
}