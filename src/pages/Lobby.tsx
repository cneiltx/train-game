import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { GameController } from '../controllers/GameController';
import { LobbyController } from '../controllers/LobbyController';
import bwTrain from '../images/backgrounds/bw-train-building.jpeg';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { JoinGame } from '../components/JoinGame';
import { Login } from '../components/Login';
import { Register } from '../components/Register';
import { Loading } from '../components/Loading';

export interface LobbyProps {
  lobby: LobbyController;
  onCreateGame: (game: GameController) => void;
  onJoinGame: (game: GameController) => void;
}

export const Lobby = (props: LobbyProps) => {
  const [user, setUser] = useState<User | null>();
  const [register, setRegister] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), setUser);
    return unsubscribe;
  }, []);

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