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

export type GameProps = {
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
    <Stack style={{ backgroundImage: `url(${tileBlack})`, backgroundRepeat: 'repeat' }} >
      <Stack direction='row' justifyContent='space-between'>
        <PlayersArea
          players={props.game.players}
          activePlayer={props.game.activePlayer}
          localPlayer={props.game.localPlayer} />
        <Gameboard
          map={props.game.map}
          highlightCities={selectedCities}
          extraProps={{ height: '80vh', width: '100%' }} />
        <DrawCardArea game={props.game} extraProps={{ width: '23vh' }} />
      </Stack>
      <LocalPlayerArea
        player={props.game.players[0]}
        cities={props.game.map.cities}
        onSelectedDestinationCardChange={handleSelectedDestinationCardChange}
        extraProps={{ height: '20vh' }} />
    </Stack>
  );
}