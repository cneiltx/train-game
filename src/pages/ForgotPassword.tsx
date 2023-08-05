import { useState } from "react";
import { firebaseAuth, registerWithEmailAndPassword } from "../Firebase";
import { Alert, Avatar, Button, Grid, IconButton, Stack, TextField } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";

export interface ForgotPasswordProps {
  onResetPassword: () => void;
  onCancel: () => void;
}

export const ForgotPassword = (props: ForgotPasswordProps) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = () => {
    setError("");
    sendPasswordResetEmail(firebaseAuth, email)
      .then(() => props.onResetPassword())
      .catch((err) => {
        console.error(err)
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
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={12}>
          <Stack direction='row' spacing="1rem" justifyContent='center'>
            <Button variant="outlined" onClick={props.onCancel}>Cancel</Button>
            <Button
              variant="outlined"
              disabled={email === ""}
              onClick={handleResetPassword}
            >
              Reset Password
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} height="2rem" />
        <Grid item xs={12} sx={{ textAlign: "left" }}>
          {error !== "" && <Alert severity="error">{error}</Alert>}
        </Grid>
        <Grid item xs={12} height="1rem" />
      </Grid>
    </Stack >
  );
}