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
  return (
    <Stack boxShadow='inset 0 0 0 3px darkblue' padding='1.5vh' spacing='1.5vh' {...props.extraProps} >
      {props.players.length > 0 && <PlayerSummary player={props.players[0]} active={props.players[0] === props.activePlayer} extraProps={{ height: '13vh' }} />}
      {props.players.length > 1 && <PlayerSummary player={props.players[1]} active={props.players[1] === props.activePlayer} extraProps={{ height: '13vh' }} />}
      {props.players.length > 2 && <PlayerSummary player={props.players[2]} active={props.players[2] === props.activePlayer} extraProps={{ height: '13vh' }} />}
      {props.players.length > 3 && <PlayerSummary player={props.players[3]} active={props.players[3] === props.activePlayer} extraProps={{ height: '13vh' }} />}
      {props.players.length > 4 && <PlayerSummary player={props.players[4]} active={props.players[4] === props.activePlayer} extraProps={{ height: '13vh' }} />}
    </Stack>
  );
}