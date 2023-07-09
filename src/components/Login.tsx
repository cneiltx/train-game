import { useState } from "react";
import { signInWithGoogle, logInWithEmailAndPassword, registerWithEmailAndPassword } from "../Firebase";
import { Alert, Button, Grid, Link, Stack, TextField } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import { getAuth, getRedirectResult } from "firebase/auth";

export interface LoginProps {
  onSignIn: () => void;
  onRegister: () => void;
}

export const Login = (props: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  const handleGoogleSignIn = () => {
    setError('');
    signInWithGoogle();
  }

  const auth = getAuth();
  getRedirectResult(auth)
    .then((credential) => {
      if (credential) {
        console.log(`Signed in user ${credential.user.email}`);
        props.onSignIn();
      }
    })
    .catch((err) => {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      }
    });

  const handleEmailSignIn = () => {

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
        <Grid item xs={12}>
          <Button
            variant='outlined'
            startIcon={<GoogleIcon />}
            onClick={handleGoogleSignIn}
          >
            Sign in with Google
          </Button>
        </Grid>
        <Grid item xs={12} height='2rem' />
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
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={1} />
        <Grid item xs={10}>
          <TextField
            name='password'
            value={password}
            size='small'
            required
            fullWidth
            id='password'
            label='Password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant='outlined'
            disabled={email === '' || password === ''}
            onClick={handleEmailSignIn}
          >
            Sign in with Email
          </Button>
        </Grid>
        <Grid item xs={12} height='2rem' />
        <Grid item xs={12}>
          <Link>Forgot Password</Link>
        </Grid>
        <Grid item xs={12}>
          Don't have an account? <Link onClick={props.onRegister}>Register</Link> now.
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