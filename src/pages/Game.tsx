import { ActivePlayerArea } from '../components/ActivePlayerArea';
import { DrawCardArea } from '../components/DrawCardArea';
import { Gameboard } from '../components/Gameboard';
import { PlayersArea } from '../components/PlayersArea';
import { GameController } from '../controllers/GameController';
import { useState } from 'react';
import { Stack } from '@mui/material';

export type GameProps = {
  game: GameController;
}

export const Game = (props: GameProps) => {
  const [faceUpTrainCards, setFaceUpTrainCards] = useState(props.game.faceUpTrainCards);

  return (
    <Stack spacing={0.5} border='solid blue'>
      <Stack spacing={0.5} border='solid green' height='80vh' direction='row' alignItems='stretch' justifyContent='space-between'>
        <PlayersArea />
        <Gameboard />
        <DrawCardArea faceUpTrainCards={faceUpTrainCards} />
      </Stack>
      <ActivePlayerArea />
    </Stack>
  );
}