import { Box } from "@mui/material";
import { PlayerStateChangeEventArgs, GameController } from "../controllers/GameController";
import { useEffect, useState } from "react";
import { GameHistory } from "./GameHistory";
import { PlayerInstructions } from "./PlayerInstructions";
import { PlayerState } from "../model/PlayerState";

export interface GameControlsProps {
  game: GameController;
  extraProps?: any;
}

export const GameControls = (props: GameControlsProps) => {
  const [isLocalPlayerActive, setIsLocalPlayerActive] = useState(props.game.localPlayer ? props.game.localPlayer.state !== PlayerState.NotActive : false);

  useEffect(() => {
    props.game.addEventListener('onPlayerStateChange', (e) => handlePlayerStateChange(e));
    return props.game.removeEventListener('onPlayerStateChange', handlePlayerStateChange);
  }, [props.game]);

  const handlePlayerStateChange = (e: CustomEventInit<PlayerStateChangeEventArgs>) => {
    setIsLocalPlayerActive(props.game.localPlayer ?
      e.detail!.player.name === props.game.localPlayer.name && e.detail!.state !== PlayerState.NotActive : false);
  }

  return (
    <Box padding='1.5vh' {...props.extraProps} flexShrink={0} >
      {isLocalPlayerActive ?
        <PlayerInstructions game={props.game} /> :
        <GameHistory game={props.game} />}
    </Box>
  );
}