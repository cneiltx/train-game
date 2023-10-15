import { useState } from "react";
import { firebaseAuth } from "../Firebase";
import { Alert, Button, Grid, Stack, TextField } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";

export interface ForgotPasswordProps {
  onResetPassword: () => void;
  onCancel: () => void;
}

export const ForgotPassword = (props: ForgotPasswordProps) => {
  const EmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const InvalidEmailMsg = "Invalid email address";

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      setError("");
      if (!email.match(EmailRegex)) {
        setError(InvalidEmailMsg);
      } else {
        sendPasswordResetEmail(firebaseAuth, email)
          .then(() => props.onResetPassword())
          .catch((err) => {
            console.error(err)
            setError(err.message);
          });
      }
    }}>
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
            onChange={(e) => setEmail(e.target.value.replace(/\s/g, ""))}
          />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="outlined" onClick={props.onCancel}>Back</Button>
            <Button
              variant="outlined"
              disabled={email === ""}
              type="submit"
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
    </form>
  );
}