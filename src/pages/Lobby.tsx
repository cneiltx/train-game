import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { GameController } from '../controllers/GameController';
import { LobbyController } from '../controllers/LobbyController';
import bwTrain from '../images/backgrounds/bw-train-building.jpeg';
import { auth } from '../Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { JoinGame } from '../components/JoinGame';
import { Login } from '../components/Login';
import { Register } from '../components/Register';

export interface LobbyProps {
  lobby: LobbyController;
  onCreateGame: (game: GameController) => void;
  onJoinGame: (game: GameController) => void;
}

export const Lobby = (props: LobbyProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [register, setRegister] = useState(false);

  const handleSignIn = () => {
    setAuthenticated(true);
  }

  const handleRegister = () => {
    setRegister(true);
  }

  const handleSignOut = () => {
    setAuthenticated(false);
  }

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
        {!authenticated && !register && < Login onSignIn={handleSignIn} onRegister={handleRegister} />}
        {!authenticated && register && <Register />}
        {authenticated && <JoinGame lobby={props.lobby} onCreateGame={props.onCreateGame} onJoinGame={props.onJoinGame} onSignOut={handleSignOut} />}
      </Stack>
    </Stack>
  );
}