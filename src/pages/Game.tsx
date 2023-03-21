import { LocalPlayerArea } from '../components/LocalPlayerArea';
import { DrawCardArea } from '../components/DrawCardArea';
import { Gameboard } from '../components/Gameboard';
import { PlayersArea } from '../components/PlayersArea';
import { GameController } from '../controllers/GameController';
import { useState } from 'react';
import { Box, Stack } from '@mui/material';

export type GameProps = {
  game: GameController;
}

export const Game = (props: GameProps) => {
  const [faceUpTrainCards, setFaceUpTrainCards] = useState(props.game.faceUpTrainCards);

  return (
    <Box>
      <Stack width='100vw' direction='row' alignItems='flex-start' justifyContent='space-between'>
        <PlayersArea players={props.game.players} activePlayer={props.game.activePlayer} localPlayer={props.game.localPlayer} />
        <Gameboard extraProps={{ height: '80vh', width: '100%' }} />
        <DrawCardArea faceUpTrainCards={faceUpTrainCards} />
      </Stack>
      <LocalPlayerArea player={props.game.players[0]} extraProps={{ width: '100vw' }} />
    </Box>
  );
}