import { Alert, Avatar, Box, Button, Grid, IconButton, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { GameController } from '../controllers/GameController';
import { LobbyController } from '../controllers/LobbyController';
import bwTrain from '../images/backgrounds/bw-train-building.jpeg';
import { GameMaps } from '../model/GameMaps';

export type LobbyProps = {
  lobby: LobbyController;
  onCreateGame: (game: GameController) => void;
  onJoinGame: (game: GameController) => void;
}

export const Lobby = (props: LobbyProps) => {
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [gameID, setGameID] = useState('');
  const [joinError, setJoinError] = useState('');

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trim());
  }

  const handleGameIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameID(e.target.value.toUpperCase().trim());
  }

  const handleJoinGame = () => {
    try {
      const game = props.lobby.joinGame(gameID, name, avatar);
      setJoinError('');
      props.onJoinGame(game);
    } catch (e) {
      if (e instanceof Error) {
        setJoinError(e.message);
      }
    }
  }

  const handleCreateGame = () => {
    try {
      const game = props.lobby.createGame(name, avatar, GameMaps.US);
      setJoinError('');
      props.onCreateGame(game);
    } catch (e) {
      if (e instanceof Error) {
        setJoinError(e.message);
      }
    }
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
      <Stack alignContent='flex-start' sx={{ backgroundColor: 'background.default', opacity: 0.9 }}>
        <Grid
          width={400}
          container
          textAlign='center'
          alignItems='center'
          padding={2}
          spacing={2}
        >
          <Grid item xs={12} sx={{ fontSize: 'h4.fontSize' }}>Ticket to Ride</Grid>
          <Grid item xs={12} height='1rem' />
          <Grid item xs={7}>
            <TextField
              name='name'
              size='small'
              required
              fullWidth
              id='name'
              label="Name"
              autoFocus
              onChange={handleNameChange}
            />
          </Grid>
          <Grid item xs={5}>
            <input accept='image/*' id='upload-avatar' type='file' hidden onChange={handleAvatarChange} />
            <label htmlFor='upload-avatar'>
              <IconButton component='span'>
                <Avatar sx={{ width: '5rem', height: '5rem', fontSize: '1rem' }} src={avatar}>Choose Avatar</Avatar>
              </IconButton>
            </label>
          </Grid>
          <Grid item xs={12} height='1rem' />
          <Grid item xs={7}>
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
          <Grid item xs={5}>
            <Button
              variant='contained'
              disabled={name === '' || avatar === '' || gameID === ''}
              onClick={handleJoinGame}
            >
              Join Game
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'left' }}>
            {joinError !== '' && <Alert severity='error'>{joinError}</Alert>}
          </Grid>
          <Grid item xs={12} height='1rem' />
          <Grid item xs={7} />
          <Grid item xs={5}>
            <Button
              variant='contained'
              disabled={name === '' || avatar === ''}
              onClick={handleCreateGame}
            >
              New Game
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
}