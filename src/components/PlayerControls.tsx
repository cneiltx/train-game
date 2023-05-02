import { Box, Button, Stack, Typography } from "@mui/material";
import { GameController, GameStateChangeEventArgs, PlayerStateChangeEventArgs } from "../controllers/GameController";
import { useEffect, useState } from "react";
import { PlayerState } from "../model/PlayerState";

export interface PlayerControlsProps {
  game: GameController;
  extraProps?: any;
}

export const PlayerControls = (props: PlayerControlsProps) => {
  const [gameState, setGameState] = useState(props.game.state);
  const [localPlayerState, setLocalPlayerState] = useState(props.game.localPlayer ? props.game.localPlayer.state : PlayerState.Waiting);

  useEffect(() => {
    props.game.addEventListener('onGameStateChange', (e) => handleGameStateChange(e));
    return props.game.removeEventListener('onGameStateChange', handleGameStateChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGameStateChange = (e: CustomEventInit<GameStateChangeEventArgs>) => {
    setGameState(e.detail!.state);
  }

  useEffect(() => {
    props.game.addEventListener('onPlayerStateChange', (e) => handlePlayerStateChange(e));
    return props.game.removeEventListener('onPlayerStateChange', handlePlayerStateChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlayerStateChange = (e: CustomEventInit<PlayerStateChangeEventArgs>) => {
    if (e.detail!.player.name === props.game.localPlayer?.name) {
      setLocalPlayerState(e.detail!.state);
    }
  }

  return (
    <Box padding='1.5vh' {...props.extraProps} flexShrink={0} >
      <Typography variant='body2' sx={{ height: '100%', overflowY: 'auto', userSelect: 'none' }} >
        <Stack spacing='1.5vh'>
          <Box>{`Game ID: ${props.game.gameID}`}</Box>
          <Box>Waiting for players to join.</Box>
          <Box display='flex' justifyContent='center'>
            <Button variant='outlined' size='small' onClick={() => props.game.startGame()}>Start Game</Button>
          </Box>
        </Stack>
      </Typography>
    </Box>
  );
}