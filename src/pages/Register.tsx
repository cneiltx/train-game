import { useState } from "react";
import { registerWithEmailAndPassword } from "../Firebase";
import { Alert, Button, Grid, Stack, TextField } from "@mui/material";

export interface RegisterProps {
  onCancel: () => void;
}

export const Register = (props: RegisterProps) => {
  const EmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const InvalidEmailMsg = "Invalid email address";
  const PasswordMatchMsg = "Passwords do not match";

  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      setEmailError("");
      setPasswordError("");
      setError("");
      let valid = true;

      if (!email.match(EmailRegex)) {
        setEmailError(InvalidEmailMsg);
        valid = false;
      }

      if (password1 !== password2) {
        setPasswordError(PasswordMatchMsg);
        valid = false;
      }

      if (valid) {
        registerWithEmailAndPassword(email, password1)
          .catch((err) => {
            console.error(err)
            setError(err.message);
          });
      }
    }} >
      <Grid
        container
        textAlign="center"
        alignItems="center"
        spacing={2}
        sx={{ overflowY: "auto" }}
      >
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
        <Grid item xs={1} />
        <Grid item xs={10}>
          <TextField
            InputLabelProps={{ shrink: true }}
            name="password1"
            value={password1}
            size="small"
            required
            fullWidth
            id="password1"
            label="Password"
            type="password"
            onChange={(e) => setPassword1(e.target.value)}
          />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={1} />
        <Grid item xs={10}>
          <TextField
            InputLabelProps={{ shrink: true }}
            name="password2"
            value={password2}
            size="small"
            required
            fullWidth
            id="password2"
            label="Retype Password"
            type="password"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing="1rem" justifyContent="center">
            <Button variant="outlined" onClick={props.onCancel}>Back</Button>
            <Button
              variant="outlined"
              disabled={email === "" || password1 === "" || password2 === ""}
              type="submit"
            >
              Register
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} />
        <Grid item xs={12} sx={{ textAlign: "left" }}>
          {emailError !== "" && <Alert severity="error">{emailError}</Alert>}
          {passwordError !== "" && <Alert severity="error">{passwordError}</Alert>}
          {error !== "" && <Alert severity="error">{error}</Alert>}
        </Grid>
      </Grid>
    </form >
  );
}