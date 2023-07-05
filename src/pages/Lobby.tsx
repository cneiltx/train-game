import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { GameController } from '../controllers/GameController';
import { LobbyController } from '../controllers/LobbyController';
import bwTrain from '../images/backgrounds/bw-train-building.jpeg';
import { auth } from '../Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { JoinGame } from '../components/JoinGame';
import { Login } from '../components/Login';

export interface LobbyProps {
  lobby: LobbyController;
  onCreateGame: (game: GameController) => void;
  onJoinGame: (game: GameController) => void;
}

export const Lobby = (props: LobbyProps) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });
  }, []);

  return (
    <Stack
      direction='row'
      justifyContent='flex-end'
      minHeight='100vh'
      sx={{
        backgroundImage: `url(${bwTrain})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Stack direction='row' sx={{ backgroundColor: 'background.default', opacity: 0.85 }}>
        {!authenticated && <Login />}
        {authenticated && <JoinGame lobby={props.lobby} onCreateGame={props.onCreateGame} onJoinGame={props.onJoinGame} />}
      </Stack>
    </Stack>
  );
}