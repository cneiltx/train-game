import { Alert, Avatar, Button, Grid, IconButton, Stack, TextField } from "@mui/material";
import { User } from "firebase/auth";
import { useState } from "react";
import { updateAvatar, updateName } from "../Firebase";

export interface UserProfileProps {
  user: User;
  onCancel: () => void;
  onSave: () => void;
}

export const UserProfile = (props: UserProfileProps) => {
  const [avatar, setAvatar] = useState(props.user.photoURL ?? "");
  const [avatarFile, setAvatarFile] = useState<File>();
  const [name, setName] = useState(props.user.displayName ?? "");
  const [error, setError] = useState("");

  const clearState = () => {
    setError("");
  }

  return (
    <Grid
      container
      textAlign="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={8}>
        <TextField
          InputLabelProps={{ shrink: true }}
          name="name"
          value={name}
          size="small"
          required
          fullWidth
          id="name"
          label="Name"
          onChange={(e) => setName(e.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <input accept="image/*" id="upload-avatar" type="file" hidden onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setAvatarFile(e.target.files[0]);
            setAvatar(URL.createObjectURL(e.target.files[0]));
          }
        }} />
        <label htmlFor="upload-avatar">
          <IconButton component="span">
            <Avatar sx={{ width: "5rem", height: "5rem", fontSize: "1rem" }} src={avatar}>Choose Avatar</Avatar>
          </IconButton>
        </label>
      </Grid>
      <Grid item xs={12} />
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="center" spacing={2}>
          <Button
            variant="outlined"
            onClick={props.onCancel}
          >
            Back
          </Button>
          <Button
            variant="outlined"
            disabled={name === "" || avatar === ""}
            onClick={() => {
              setError("");
              const nameVal = name.trim();

              if (props.user.displayName !== nameVal) {
                updateName(nameVal)
                  .catch((err) => {
                    console.error(err);
                    setError(err);
                  });
              }

              if (avatarFile) {
                updateAvatar(avatarFile)
                  .then((url) => setAvatar(url))
                  .catch((err) => {
                    console.error(err);
                    setError(err);
                  });
              }

              props.onSave();
            }}
          >
            Save
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "left" }}>
        {error !== "" && <Alert severity="error">{error}</Alert>}
      </Grid>
    </Grid>
  );
}