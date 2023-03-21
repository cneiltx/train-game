import { Stack } from "@mui/material";
import { Player } from "../model/Player";
import { PlayerSummary } from "./PlayerSummary";

export type PlayersAreaProps = {
  players: Player[];
  activePlayer: Player | null;
  localPlayer: Player;
  extraProps?: any;
}

export const PlayersArea = (props: PlayersAreaProps) => {
  return (
    <Stack border='solid red' padding='1vh' spacing='1vh' {...props.extraProps} >
      <PlayerSummary player={props.players[0]} extraProps={{ height: '15vh', width: '15vw' }} />
      <PlayerSummary player={props.players[0]} extraProps={{ height: '15vh', width: '15vw' }} />
      <PlayerSummary player={props.players[0]} extraProps={{ height: '15vh', width: '15vw' }} />
      <PlayerSummary player={props.players[0]} extraProps={{ height: '15vh', width: '15vw' }} />
    </Stack>
  );
}