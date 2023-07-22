import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { GameController } from '../controllers/GameController';
import { LobbyController } from '../controllers/LobbyController';
import bwTrain from '../images/backgrounds/bw-train-building.jpeg';
import { User, onAuthStateChanged } from 'firebase/auth';
import { JoinGame } from './JoinGame';
import { Login } from './Login';
import { Register } from './Register';
import { Loading } from './Loading';
import { firebaseAuth } from '../Firebase';

export interface LobbyProps {
  lobby: LobbyController;
  onCreateGame: (game: GameController) => void;
  onJoinGame: (game: GameController) => void;
}

export const Lobby = (props: LobbyProps) => {
  const [user, setUser] = useState<User | null>();
  const [register, setRegister] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, handleAuthStateChanged);
    return unsubscribe;
  }, []);

  const handleAuthStateChanged = (user: User | null) => {
    setUser(user);

    if (user) {
      console.log(`Signed in user ${user.email}`);
    } else {
      console.log('Signed out user');
    }
  }

  const handleRegister = () => {
    setRegister(true);
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
        {user === undefined && <Loading />}
        {user === null && !register && < Login onRegister={handleRegister} />}
        {user === null && register && <Register />}
        {user && <JoinGame lobby={props.lobby} user={user} onCreateGame={props.onCreateGame} onJoinGame={props.onJoinGame} />}
      </Stack>
    </Stack>
  );
}