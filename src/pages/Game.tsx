import { LocalPlayerArea } from '../components/LocalPlayerArea';
import { DrawCardArea } from '../components/DrawCardArea';
import { Gameboard } from '../components/Gameboard';
import { PlayersArea } from '../components/PlayersArea';
import { GameController } from '../controllers/GameController';
import { Stack } from '@mui/material';

export type GameProps = {
  game: GameController;
}

export const Game = (props: GameProps) => {
  return (
    <Stack>
      <Stack direction='row' justifyContent='space-between'>
        <PlayersArea players={props.game.players} activePlayer={props.game.activePlayer} localPlayer={props.game.localPlayer} />
        <Gameboard extraProps={{ height: '80vh', width: '100%' }} />
        <DrawCardArea trainCardDeck={props.game.trainCardDeck} faceUpTrainCards={props.game.faceUpTrainCards} destinationCardDeck={props.game.destinationCardDeck} />
      </Stack>
      <LocalPlayerArea player={props.game.players[0]} extraProps={{ height: '19vh' }} />
    </Stack>
  );
}