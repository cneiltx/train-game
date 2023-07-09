import { useState } from "react";
import { registerWithEmailAndPassword } from "../Firebase";
import { Alert, Avatar, Button, Grid, IconButton, Stack, TextField } from "@mui/material";

export interface RegisterProps {
}

export const Register = (props: RegisterProps) => {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const avatarVal = URL.createObjectURL(e.target.files[0]);
      setAvatar(avatarVal);
      setAvatarFile(e.target.files[0]);
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameVal = e.target.value.trim();
    setName(nameVal);
  }

  const handleRegister = () => {
    if (password1 !== password2) {
      setError('Passwords do not match');
    } else {
      setError('');
      registerWithEmailAndPassword(name, avatarFile!, email, password1);
    }
  }

  return (
    <Stack justifyContent='space-between' alignItems='center' >
      <Grid
        width={400}
        container
        textAlign='center'
        alignItems='center'
        padding={2}
        spacing={1}
      >
        <Grid item xs={12} sx={{ fontSize: 'h4.fontSize' }}>Welcome to<br></br>The Train Game!</Grid>
        <Grid item xs={12} height='2rem' />
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
        <Grid item xs={1} />
        <Grid item xs={10}>
          <TextField
            name='email'
            value={email}
            size='small'
            required
            fullWidth
            id='email'
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={1} />
        <Grid item xs={10}>
          <TextField
            name='password1'
            value={password1}
            size='small'
            required
            fullWidth
            id='password1'
            label='Password'
            type='password'
            onChange={(e) => setPassword1(e.target.value)}
          />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={1} />
        <Grid item xs={10}>
          <TextField
            name='password2'
            value={password2}
            size='small'
            required
            fullWidth
            id='password2'
            label='Retype Password'
            type='password'
            onChange={(e) => setPassword2(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant='outlined'
            disabled={email === '' || password1 === '' || password2 === '' || name === '' || avatarFile === null}
            onClick={handleRegister}
          >
            Register
          </Button>
        </Grid>
        <Grid item xs={12} height='2rem' />
        <Grid item xs={12} sx={{ textAlign: 'left' }}>
          {error !== '' && <Alert severity='error'>{error}</Alert>}
        </Grid>
        <Grid item xs={12} height='1rem' />
      </Grid>
    </Stack>
  );
}