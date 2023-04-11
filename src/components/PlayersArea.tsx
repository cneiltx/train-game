import { Stack } from "@mui/material";
import { Player } from "../model/Player";
import { PlayerSummary } from "./PlayerSummary";

export type PlayersAreaProps = {
  players: Player[];
  activePlayer: Player;
  localPlayer: Player;
  extraProps?: any;
}

export const PlayersArea = (props: PlayersAreaProps) => {
  const players = [];
  let index = 0;

  for (const player of props.players) {
    players.push(<PlayerSummary key={index} player={player} active={player.name === props.activePlayer.name} extraProps={{ height: '13vh' }} />);
    index++;
  }

  return (
    <Stack boxShadow='inset 0 0 0 3px darkblue' padding='1.5vh' spacing='1.5vh' {...props.extraProps} >
      {players}
    </Stack>
  );
}