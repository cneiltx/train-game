import './Game.css';
import { ActivePlayerArea } from '../components/ActivePlayerArea';
import { DrawCardArea } from '../components/DrawCardArea';
import { Gameboard } from '../components/Gameboard';
import { PlayersArea } from '../components/PlayersArea';
import { GameController } from '../controllers/GameController';

export type GameProps = {
  game: GameController;
}

export const Game = (props: GameProps) => {
  return (
    <div className="Game">
      <PlayersArea />
      <Gameboard width={1425} />
      <DrawCardArea />
      <ActivePlayerArea />
    </div>
  );
}