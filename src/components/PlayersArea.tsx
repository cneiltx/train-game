import { Stack } from "@mui/material";
import { Player } from "../model/Player";
import { PlayerSummary } from "./PlayerSummary";
import { GameController } from "../controllers/GameController";

export type PlayersAreaProps = {
  game: GameController;
  extraProps?: any;
}

export const PlayersArea = (props: PlayersAreaProps) => {
  const players = [];

  for (const player of props.game.players) {
    players.push(<PlayerSummary key={player.name} player={player} active={player.name === props.game.activePlayer.name} extraProps={{ height: '13vh', width: '26vh' }} />);
  }

  return (
    <Stack boxShadow='inset 0 0 0 3px darkblue' padding='1.5vh' spacing='1.5vh' {...props.extraProps} >
      {players}
    </Stack>
  );
}