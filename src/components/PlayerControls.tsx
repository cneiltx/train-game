import { Box, Button, Stack, Typography } from "@mui/material";
import { GameController, GameStateChangeEventArgs, PlayerStateChangeEventArgs, PlayersChangeEventArgs } from "../controllers/GameController";
import { useEffect, useState } from "react";
import { PlayerState } from "../model/PlayerState";
import { GameState } from "../model/GameState";

export interface PlayerControlsProps {
  game: GameController;
  extraProps?: any;
}

export const PlayerControls = (props: PlayerControlsProps) => {
  const [gameState, setGameState] = useState(props.game.state);
  const [localPlayerState, setLocalPlayerState] = useState(props.game.localPlayer ? props.game.localPlayer.state : PlayerState.Waiting);
  const [playerCount, setPlayerCount] = useState(props.game.players.length);

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

  useEffect(() => {
    props.game.addEventListener('onPlayersChange', (e) => handlePlayersChange(e));
    return props.game.removeEventListener('onPlayersChange', handlePlayersChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlayersChange = (e: CustomEventInit<PlayersChangeEventArgs>) => {
    setPlayerCount(e.detail!.players.length);
  }

  const handleSelectDestinationCards = () => {

  }

  return (
    <Box padding='1.5vh' {...props.extraProps} flexShrink={0} >
      <Typography variant='body2' sx={{ height: '100%', overflowY: 'auto', userSelect: 'none' }} >
        {gameState === GameState.Initializing && <Stack spacing='1.5vh'>
          <Box>{`Game ID: ${props.game.gameID}`}</Box>
          {playerCount < 5 ? <Box>Waiting for players to join.</Box> :
            <Box>No more players can join.</Box>}
          <Box display='flex' justifyContent='center'>
            <Button variant='outlined' size='small' disabled={playerCount < 2} onClick={() => props.game.startGame()}>Start Game</Button>
          </Box>
        </Stack>}
        {gameState === GameState.Playing && localPlayerState === PlayerState.StartingTurn && <Stack spacing='1.5vh'>
          <Box>Your turn!</Box>
          <Box>Draw a train card, draw destination cards, or claim a route.</Box>
        </Stack>}
        {gameState === GameState.Playing && localPlayerState === PlayerState.DrawingTrainCards && <Stack spacing='1.5vh'>
          <Box>Draw another train card.</Box>
        </Stack>}
        {gameState === GameState.Playing && localPlayerState === PlayerState.DrawingDestinationCards && <Stack spacing='1.5vh'>
          <Box>Select 1 or more cards to keep.</Box>
          <Box display='flex' justifyContent='center'>
            <Button variant='outlined' size='small' disabled={false} onClick={handleSelectDestinationCards}>Keep Selected Cards</Button>
          </Box>
        </Stack>}
      </Typography>
    </Box>
  );
}