import { Avatar, Button, Container, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { GameController } from '../controllers/GameController';
import { LobbyController } from '../controllers/LobbyController';
import './Lobby.css';

export type LobbyProps = {
  onStartGame: (game: GameController) => void;
}

export const Lobby = (props: LobbyProps) => {
  const lobby = new LobbyController();
  const [avatar, setAvatar] = useState('');

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAvatar(URL.createObjectURL(event.target.files[0]));
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Grid container textAlign='center' alignItems='center' spacing={2} padding={5}>
        <Grid item xs={12}>STEP 1:</Grid>
        <Grid item xs={12}>
          <TextField
            name="name"
            required
            fullWidth
            id="name"
            label="Name"
            autoFocus
          />
        </Grid>
        <Grid item xs={8}>
          <Button variant='contained' component='label'>
            Select Avatar Image
            <input hidden type='file' accept='image/*' onChange={handleAvatarChange} />
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Avatar sx={{ width: 64, height: 64 }} src={avatar} />
        </Grid>
        <Grid item xs={12} height={30} />
        <Grid item xs={12}>STEP 2:</Grid>
        <Grid item xs={6}>
          <TextField
            name="gameID"
            fullWidth
            id="gameID"
            label="Game ID"
          />
        </Grid>
        <Grid item xs={6}>
          <Button variant='contained'>Join Game</Button>
        </Grid>
        <Grid item xs={12}>- OR -</Grid>
        <Grid item xs={12}>
          <Button variant='contained'>Create New Game</Button>
        </Grid>
      </Grid>
    </Container>
  );
}