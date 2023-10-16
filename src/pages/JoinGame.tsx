import { Alert, Avatar, Box, Button, Grid, IconButton, Stack, TextField } from "@mui/material";
import { User } from "firebase/auth";
import { useState } from "react";
import { logout, updateAvatar, updateName } from "../Firebase";
import { BrowseGames } from "./BrowseGames";
import { GameMaps } from "../model/GameMaps";
import { LobbyController } from "../controllers/LobbyController";
import { GameController } from "../controllers/GameController";

export interface JoinGameProps {
  lobby: LobbyController;
  user: User;
  onCreateGame: (game: GameController) => void;
  onJoinGame: (game: GameController) => void;
}

export const JoinGame = (props: JoinGameProps) => {
  const [avatar, setAvatar] = useState(props.user.photoURL ?? "");
  const [name, setName] = useState(props.user.displayName ?? "");
  const [gameID, setGameID] = useState("");
  const [error, setError] = useState("");
  const [browseGames, setBrowseGames] = useState(false);

  const clearState = () => {
    setGameID("");
    setError("");
  }

  return (
    <Stack alignItems="center" height="100vh" sx={{ overflow: "hidden" }}>
      <Box paddingBottom={3} fontSize="h5.fontSize">Welcome to The Train Game!</Box>
      {browseGames && <BrowseGames onCancel={() => setBrowseGames(false)} />}
      {!browseGames && <Stack justifyContent="space-between" alignItems="center" height="100%" >
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
              onBlur={(e) => {
                const nameVal = name.trim();
                if (props.user.displayName !== nameVal) {
                  updateName(nameVal)
                    .catch((err) => {
                      console.error(err);
                      setError(err);
                    });
                }
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <input accept="image/*" id="upload-avatar" type="file" hidden onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                updateAvatar(e.target.files[0])
                  .then((url) => setAvatar(url))
                  .catch((err) => {
                    console.error(err);
                    setError(err);
                  });
              }
            }} />
            <label htmlFor="upload-avatar">
              <IconButton component="span">
                <Avatar sx={{ width: "5rem", height: "5rem", fontSize: "1rem" }} src={avatar}>Choose Avatar</Avatar>
              </IconButton>
            </label>
          </Grid>
          <Grid item xs={8}>
            <TextField
              InputLabelProps={{ shrink: true }}
              name="gameID"
              value={gameID}
              size="small"
              fullWidth
              id="gameID"
              label="Game ID"
              autoFocus
              inputProps={{ sx: { textTransform: "uppercase" } }}
              onChange={(e) => setGameID(e.target.value.toUpperCase().replace(/\s/g, ""))}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="outlined"
              disabled={name === "" || avatar === "" || gameID === ""}
              onClick={() => {
                setError("");

                try {
                  const game = props.lobby.joinGame(gameID, name, avatar);
                  setError("");
                  props.onJoinGame(game);
                } catch (e) {
                  if (e instanceof Error) {
                    setError(e.message);
                  }
                }
              }}
            >
              Join Game
            </Button>
          </Grid>
          <Grid item xs={12} />
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="center" spacing={2}>
              <Button
                variant="outlined"
                onClick={() => {
                  clearState();
                  setBrowseGames(true);
                }}
              >
                View My Games
              </Button>
              <Button
                variant="outlined"
                disabled={name === "" || avatar === ""}
                onClick={() => {
                  setError("");

                  try {
                    const game = props.lobby.createGame(name, avatar, GameMaps.US);
                    setError("");
                    props.onCreateGame(game);
                  } catch (e) {
                    if (e instanceof Error) {
                      setError(e.message);
                    }
                  }
                }}
              >
                New Game
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "left" }}>
            {error !== "" && <Alert severity="error">{error}</Alert>}
          </Grid>
        </Grid>
        <Box>
          <Button variant="outlined" onClick={() => {
            setError("");

            logout()
              .catch((err) => {
                console.error(err);
                setError(err);
              });
          }}>Sign Out</Button>
        </Box>
      </Stack>}
    </Stack>
  );
}