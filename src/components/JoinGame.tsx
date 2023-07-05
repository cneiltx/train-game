import { Alert, Avatar, Box, Button, Grid, IconButton, Stack, TextField } from "@mui/material";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, logout, storage } from "../Firebase";
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { GameMaps } from "../model/GameMaps";
import { LobbyController } from "../controllers/LobbyController";
import { GameController } from "../controllers/GameController";

export interface JoinGameProps {
  lobby: LobbyController;
  onCreateGame: (game: GameController) => void;
  onJoinGame: (game: GameController) => void;
}

export const JoinGame = (props: JoinGameProps) => {
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [gameID, setGameID] = useState('');
  const [joinError, setJoinError] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAvatar(user.photoURL ?? '');
        setName(user.displayName ?? '');
      }
    });
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const avatarVal = URL.createObjectURL(e.target.files[0]);
      setAvatar(avatarVal);
      if (auth.currentUser) {
        const prevPhotos = ref(storage, `/user/${auth.currentUser!.uid}/profile-picture.*`);
        listAll(prevPhotos)
          .then(files => {
            files.items.forEach(file => {
              deleteObject(file);
            });
          })
          .catch(error => console.error(error));

        const newPhoto = ref(storage, `/user/${auth.currentUser.uid}/profile-picture${e.target.files[0].name.substring(e.target.files[0].name.lastIndexOf('.'))}`);
        uploadBytes(newPhoto, e.target.files[0])
          .then((result) => {
            getDownloadURL(newPhoto)
              .then((url) => {
                updateProfile(auth.currentUser!, {
                  photoURL: url,
                })
              })
          })
          .catch(error => console.error(error));
      }
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameVal = e.target.value.trim();
    setName(nameVal);
    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: nameVal
      });
    }
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

  const handleSignOut = () => {
    logout();
  }

  // TODO: Email sign in

  return (
    <Stack justifyContent='space-between' alignItems='center' >
      <Stack>
        <Grid
          width={400}
          container
          textAlign='center'
          alignItems='center'
          padding={2}
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
            {joinError !== '' && <Alert severity='error'>{joinError}</Alert>}
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