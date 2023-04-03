import { LocalPlayerArea } from '../components/LocalPlayerArea';
import { DrawCardArea } from '../components/DrawCardArea';
import { Gameboard } from '../components/Gameboard';
import { PlayersArea } from '../components/PlayersArea';
import { GameController } from '../controllers/GameController';
import { Stack } from '@mui/material';
import tileBlack from '../images/backgrounds/tile-black.jpg';

export type GameProps = {
  game: GameController;
}

export const Game = (props: GameProps) => {
  return (
    <Stack style={{ backgroundImage: `url(${tileBlack})`, backgroundRepeat: 'repeat' }} >
      <Stack direction='row' justifyContent='space-between'>
        <PlayersArea players={props.game.players} activePlayer={props.game.activePlayer} localPlayer={props.game.localPlayer} />
        <Gameboard map={props.game.map} extraProps={{ height: '80vh', width: '100%' }} />
        <DrawCardArea trainCardDeck={props.game.trainCardDeck} faceUpTrainCards={props.game.faceUpTrainCards} destinationCardDeck={props.game.destinationCardDeck} />
      </Stack>
      <LocalPlayerArea player={props.game.players[0]} extraProps={{ height: '20vh' }} />
    </Stack>
  );
}