import { Alert, Avatar, Box, Button, Grid, IconButton, Stack, TextField } from "@mui/material";
import { User } from "firebase/auth";
import { useState } from "react";
import { logout, updateAvatar, updateName } from "../Firebase";
import { GameMaps } from "../model/GameMaps";
import { LobbyController } from "../controllers/LobbyController";
import { GameController } from "../controllers/GameController";

export interface JoinGameProps {
  lobby: LobbyController;
  user: User;
  onCreateGame: (game: GameController) => void;
  onJoinGame: (game: GameController) => void;
}

export const JoinGame = (props: JoinGameProps) => {
  const [avatar, setAvatar] = useState(props.user.photoURL ?? '');
  const [name, setName] = useState(props.user.displayName ?? '');
  const [gameID, setGameID] = useState('');
  const [error, setError] = useState('');

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateAvatar(e.target.files[0])
        .then((url) => setAvatar(url))
        .catch((err) => {
          console.error(err);
          setError(err);
        });
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameVal = e.target.value.trim();
    setName(nameVal);
  }

  const handleNameLostFocus = () => {
    if (props.user.displayName !== name) {
      updateName(name)
        .catch((err) => {
          console.error(err);
          setError(err);
        });
    }
  }

  const handleGameIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameID(e.target.value.toUpperCase().trim());
  }

  const handleJoinGame = () => {
    setError('');

    try {
      const game = props.lobby.joinGame(gameID, name, avatar);
      setError('');
      props.onJoinGame(game);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  }

  const handleCreateGame = () => {
    setError('');

    try {
      const game = props.lobby.createGame(name, avatar, GameMaps.US);
      setError('');
      props.onCreateGame(game);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  }

  const handleSignOut = () => {
    setError('');

    logout()
      .then(() => {
        console.log('Signout successful');
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }

  return (
    <Stack justifyContent='space-between' alignItems='center' >
      <Stack>
        <Grid
          width={400}
          container
          textAlign='center'
          alignItems='center'
          padding={2}
          spacing={1}
        >
          <Grid item xs={12} sx={{ fontSize: 'h4.fontSize' }}>Welcome to<br></br>The Train Game!</Grid>
          <Grid item xs={12} height='1rem' />
          <Grid item xs={8}>
            <TextField
              name='name'
              value={name}
              size='small'
              required
              fullWidth
              id='name'
              label="Name"
              autoFocus
              onChange={handleNameChange}
              onBlur={handleNameLostFocus}
            />
          </Grid>
          <Grid item xs={4}>
            <input accept='image/*' id='upload-avatar' type='file' hidden onChange={handleAvatarChange} />
            <label htmlFor='upload-avatar'>
              <IconButton component='span'>
                <Avatar sx={{ width: '5rem', height: '5rem', fontSize: '1rem' }} src={avatar}>Choose Avatar</Avatar>
              </IconButton>
            </label>
          </Grid>
          <Grid item xs={12} height='1rem' />
          <Grid item xs={8}>
            <TextField
              name='gameID'
              size='small'
              fullWidth
              id='gameID'
              label='Game ID'
              inputProps={{ sx: { textTransform: 'uppercase' } }}
              onChange={handleGameIDChange}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant='outlined'
              disabled={name === '' || avatar === '' || gameID === ''}
              onClick={handleJoinGame}
            >
              Join Game
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'left' }}>
            {error !== '' && <Alert severity='error'>{error}</Alert>}
          </Grid>
          <Grid item xs={12} height='1rem' />
          <Grid item xs={8} />
          <Grid item xs={4}>
            <Button
              variant='outlined'
              disabled={name === '' || avatar === ''}
              onClick={handleCreateGame}
            >
              New Game
            </Button>
          </Grid>
        </Grid>
      </Stack>
      <Box padding={2}>
        <Button variant='outlined' onClick={handleSignOut}>Sign Out</Button>
      </Box>
    </Stack>
  );
}