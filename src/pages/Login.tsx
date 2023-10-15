import { useState } from "react";
import { signInWithGoogle, firebaseAuth } from "../Firebase";
import { Alert, Box, Button, Grid, Link, Stack, TextField } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ForgotPassword } from "./ForgotPassword";
import { Register } from "./Register";

export interface LoginProps {
  emailVerificationSent?: boolean;
}

export const Login = (props: LoginProps) => {
  const EmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const InvalidEmailMsg = "Invalid email address";
  const PasswordResetSentMsg = "A password reset email has been sent. The email is from noreply@train-game-e75ed.firebaseapp.com. " +
    "Please click the link to reset your password, then sign in again. If you don't see the email, check your Spam folder.";
  const EmailVerificationSentMsg = "A verification link has been sent to your email. The email is from noreply@train-game-e75ed.firebaseapp.com. " +
    "Please click the link to verify your email, then sign in again. If you don't see the email, check your Spam folder.";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [state, setState] = useState<"login" | "forgotPassword" | "register">("login");
  const [message, setMessage] = useState(props.emailVerificationSent ? EmailVerificationSentMsg : "");

  return (
    <Stack alignItems="center" sx={{ overflow: "hidden" }}>
      <Box paddingBottom={3} fontSize="h5.fontSize">Welcome to The Train Game!</Box>
      {state === "forgotPassword" && <ForgotPassword onResetPassword={() => {
        setState("login");
        setMessage(PasswordResetSentMsg);
      }}
        onCancel={() => setState("login")} />}
      {state === "register" && <Register onCancel={() => setState("login")} />}
      {state === "login" && <form onSubmit={(e) => {
        e.preventDefault();
        setError("");
        if (!email.match(EmailRegex)) {
          setError(InvalidEmailMsg);
        } else {
          signOut(firebaseAuth)
            .then(() => signInWithEmailAndPassword(firebaseAuth, email, password))
            .catch((err) => {
              console.error(err);
              setError(err.message);
            });
        }
      }}>
        <Grid
          container
          textAlign="center"
          alignItems="center"
          spacing={2}
          sx={{ overflowY: "auto" }}
        >
          <Grid item xs={12}>
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={() => {
                setError("");
                signOut(firebaseAuth)
                  .then(() => signInWithGoogle())
                  .catch((err) => {
                    console.error(err);
                    setError(err.message);
                  });
              }}
            >
              Sign in with Google
            </Button>
          </Grid>
          <Grid item xs={12} height="1rem" />
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
              onChange={(e) => setEmail(e.target.value.replace(/\s/g, ""))}
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
              type="submit"
            >
              Sign in
            </Button>
          </Grid>
          <Grid item xs={12} />
          <Grid item xs={12} sx={{ userSelect: "none" }}>
            <Link onClick={() => setState("forgotPassword")} style={{ cursor: "pointer" }}>Forgot Password?</Link>
          </Grid>
          <Grid item xs={12} sx={{ userSelect: "none" }}>
            Don't have an account? <Link onClick={() => setState("register")} style={{ cursor: "pointer" }}>Register</Link> now.
          </Grid>
          <Grid item xs={12} />
          <Grid item xs={12} sx={{ textAlign: "left" }}>
            {message !== "" && <Alert severity="info">{message}</Alert>}
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "left" }}>
            {error !== "" && <Alert severity="error">{error}</Alert>}
          </Grid>
        </Grid>
      </form>}
    </Stack>
  );
}