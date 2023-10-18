import { Alert, Avatar, Box, Button, Grid, Stack, TextField } from "@mui/material";
import { User } from "firebase/auth";
import { useState } from "react";
import { logout } from "../Firebase";
import { BrowseGames } from "./BrowseGames";
import { GameMaps } from "../model/GameMaps";
import { LobbyController } from "../controllers/LobbyController";
import { GameController } from "../controllers/GameController";
import { UserProfile } from "./UserProfile";

export interface JoinGameProps {
  lobby: LobbyController;
  user: User;
  onCreateGame: (game: GameController) => void;
  onJoinGame: (game: GameController) => void;
}

export const JoinGame = (props: JoinGameProps) => {
  const [gameID, setGameID] = useState("");
  const [error, setError] = useState("");
  const [userProfile, setUserProfile] = useState(false);
  const [browseGames, setBrowseGames] = useState(false);

  const clearState = () => {
    setGameID("");
    setError("");
  }

  return (
    <Stack alignItems="center" height="100vh" sx={{ overflow: "hidden" }}>
      <Box paddingBottom={3} fontSize="h5.fontSize">Welcome to The Train Game!</Box>
      {userProfile && <UserProfile user={props.user} onSave={() => setUserProfile(false)} onCancel={() => setUserProfile(false)} />}
      {browseGames && <BrowseGames onCancel={() => setBrowseGames(false)} />}
      {!browseGames && !userProfile && <Stack justifyContent="space-between" alignItems="center" height="100%" >
        <Grid
          container
          textAlign="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={8}>
            {props.user.displayName}
          </Grid>
          <Grid item xs={4}>
            {props.user.photoURL && <Avatar sx={{ width: "5rem", height: "5rem", fontSize: "1rem" }} src={props.user.photoURL} />}
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
              disabled={gameID === ""}
              onClick={() => {
                setError("");

                try {
                  const game = props.lobby.joinGame(gameID, props.user.displayName ?? "", props.user.photoURL ?? "");
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
                  setUserProfile(true);
                }}
              >
                User Profile
              </Button>
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
                onClick={() => {
                  setError("");

                  try {
                    const game = props.lobby.createGame(props.user.displayName ?? "", props.user.photoURL ?? "", GameMaps.US);
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