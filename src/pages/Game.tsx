import { LocalPlayerArea } from '../components/LocalPlayerArea';
import { DrawCardArea } from '../components/DrawCardArea';
import { Gameboard } from '../components/Gameboard';
import { PlayersArea } from '../components/PlayersArea';
import { GameController } from '../controllers/GameController';
import { Stack } from '@mui/material';
import tileBlack from '../images/backgrounds/tile-black.jpg';
import { USCities } from '../model/USCities';
import { DestinationCard } from '../model/DestinationCard';
import { useState } from 'react';
import { GameControls } from '../components/GameControls';

export interface GameProps {
  game: GameController;
}

export const Game = (props: GameProps) => {
  const [selectedCities, setSelectedCities] = useState<USCities[]>([]);

  const handleSelectedDestinationCardChange = (card: DestinationCard | null) => {
    if (card) {
      setSelectedCities([card.city1, card.city2]);
    } else {
      setSelectedCities([]);
    }
  }

  return (
    <Stack boxShadow='inset 0 0 0 3px darkgoldenrod' style={{ backgroundImage: `url(${tileBlack})`, backgroundRepeat: 'repeat' }}>
      <Stack boxShadow='inset 0 -3px 0 0 darkgoldenrod' key='topRow' direction='row' justifyContent='space-between'>
        <PlayersArea key='playerArea' game={props.game} extraProps={{ width: '29vh', boxShadow: 'inset -3px 0 0 0 darkgoldenrod' }} />
        <Gameboard
          key='gameboard'
          game={props.game}
          highlightCities={selectedCities}
          extraProps={{ height: '80vh', flexGrow: 1 }} />
        <DrawCardArea key='drawCardArea' game={props.game} extraProps={{ width: '18vh', boxShadow: 'inset 3px 0 0 0px darkgoldenrod' }} />
      </Stack>
      <Stack key='bottomRow' direction='row' height='20vh' >
        <GameControls key='gameControls' extraProps={{ width: '29vh', boxShadow: 'inset -3px 0 0 0 darkgoldenrod' }} />
        <LocalPlayerArea
          key='localPlayerArea'
          game={props.game}
          onSelectedDestinationCardChange={handleSelectedDestinationCardChange}
          extraProps={{ flexGrow: 1, width: 'calc(100vw - 29vh)' }} />
      </Stack>
    </Stack>
  );
}