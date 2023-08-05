import { useState } from "react";
import { signInWithGoogle, registerWithEmailAndPassword, firebaseAuth } from "../Firebase";
import { Alert, Button, Grid, Link, Stack, TextField } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export interface LoginProps {
  onRegister: () => void;
  onForgotPassword: () => void;
  info?: string;
}

export const Login = (props: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState(props.info ?? "");

  const handleGoogleSignIn = () => {
    setError("");
    signOut(firebaseAuth)
      .then(() => signInWithGoogle())
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }

  const handleEmailSignIn = () => {
    setError("");
    signOut(firebaseAuth)
      .then(() => signInWithEmailAndPassword(firebaseAuth, email, password))
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }

  return (
    <Stack justifyContent="space-between" alignItems="center" >
      <Grid
        width={400}
        container
        textAlign="center"
        alignItems="center"
        padding={2}
        spacing={1.5}
      >
        <Grid item xs={12} sx={{ fontSize: "h4.fontSize", userSelect: "none" }}>Welcome to<br></br>The Train Game!</Grid>
        <Grid item xs={12} height="2rem" />
        <Grid item xs={12}>
          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleSignIn}
          >
            Sign in with Google
          </Button>
        </Grid>
        <Grid item xs={12} height="2rem" />
        <Grid item xs={1} />
        <Grid item xs={10}>
          <TextField
            InputLabelProps={{ shrink: true }}
            name="email"
            value={email}
            size="small"
            required
            fullWidth
            id="email"
            label="Email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={1} />
        <Grid item xs={10}>
          <TextField
            InputLabelProps={{ shrink: true }}
            name="password"
            value={password}
            size="small"
            required
            fullWidth
            id="password"
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            disabled={email === "" || password === ""}
            onClick={handleEmailSignIn}
          >
            Sign in with Email
          </Button>
        </Grid>
        <Grid item xs={12} height="2rem" />
        <Grid item xs={12} sx={{ userSelect: "none" }}>
          <Link onClick={props.onForgotPassword} style={{ cursor: "pointer" }}>Forgot Password?</Link>
        </Grid>
        <Grid item xs={12} sx={{ userSelect: "none" }}>
          Don't have an account? <Link onClick={props.onRegister} style={{ cursor: "pointer" }}>Register</Link> now.
        </Grid>
        <Grid item xs={12} height="2rem" />
        <Grid item xs={12} sx={{ textAlign: "left" }}>
          {info !== "" && <Alert severity="info">{info}</Alert>}
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "left" }}>
          {error !== "" && <Alert severity="error">{error}</Alert>}
        </Grid>
        <Grid item xs={12} height="1rem" />
      </Grid>
    </Stack>
  );
}