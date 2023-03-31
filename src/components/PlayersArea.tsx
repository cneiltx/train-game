import { Stack } from "@mui/material";
import { Player } from "../model/Player";
import { PlayerSummary } from "./PlayerSummary";
import tileBlue from '../images/backgrounds/tile-blue.jpg';

export type PlayersAreaProps = {
  players: Player[];
  activePlayer: Player;
  localPlayer: Player;
  extraProps?: any;
}

export const PlayersArea = (props: PlayersAreaProps) => {
  return (
    <Stack style={{ backgroundImage: `url(${tileBlue})`, backgroundRepeat: 'repeat' }} boxShadow='inset 0 0 5px 2px gold' padding='1.5vh' spacing='2vh' {...props.extraProps} >
      <PlayerSummary player={props.players[0]} extraProps={{ height: '13vh' }} />
      <PlayerSummary player={props.players[0]} extraProps={{ height: '13vh' }} />
      <PlayerSummary player={props.players[0]} extraProps={{ height: '13vh' }} />
      <PlayerSummary player={props.players[0]} extraProps={{ height: '13vh' }} />
      <PlayerSummary player={props.players[0]} extraProps={{ height: '13vh' }} />
    </Stack>
  );
}