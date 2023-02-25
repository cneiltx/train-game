import './Game.css';
import { ActivePlayerArea } from '../components/ActivePlayerArea';
import { DrawCardArea } from '../components/DrawCardArea';
import { Gameboard } from '../components/Gameboard';
import { PlayersArea } from '../components/PlayersArea';
import { GameController } from '../controllers/GameController';
import { useState } from 'react';

export type GameProps = {
  game: GameController;
}

export const Game = (props: GameProps) => {
  const [faceUpTrainCards, setFaceUpTrainCards] = useState(props.game.faceUpTrainCards);

  return (
    <div className="Game">
      <PlayersArea />
      <Gameboard width={1425} />
      <DrawCardArea faceUpTrainCards={faceUpTrainCards} />
      <ActivePlayerArea />
    </div>
  );
}