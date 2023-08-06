import { useState } from "react";
import { firebaseAuth } from "../Firebase";
import { Alert, Box, Button, Grid, Stack, TextField } from "@mui/material";
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
    <Stack alignItems="center">
      <Box fontSize="h5.fontSize">Welcome to The Train Game!</Box>
      <Grid
        container
        textAlign="center"
        alignItems="center"
        spacing={2}
      >
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
          <Stack direction="row" spacing={2} justifyContent="center">
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
        <Grid item xs={12} />
        <Grid item xs={12} sx={{ textAlign: "left" }}>
          {error !== "" && <Alert severity="error">{error}</Alert>}
        </Grid>
      </Grid>
    </Stack>
  );
}