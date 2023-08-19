import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { GameController } from "../controllers/GameController";
import { LobbyController } from "../controllers/LobbyController";
import bwTrain from "../images/backgrounds/bw-train-building.jpeg";
import { User, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { JoinGame } from "./JoinGame";
import { Login } from "./Login";
import { Loading } from "./Loading";
import { firebaseAuth } from "../Firebase";

export interface LobbyProps {
  lobby: LobbyController;
  onCreateGame: (game: GameController) => void;
  onJoinGame: (game: GameController) => void;
}

export const Lobby = (props: LobbyProps) => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, handleAuthStateChanged);
    return unsubscribe;
  }, []);

  const handleAuthStateChanged = (user: User | null | undefined) => {
    setUser(user);

    if (user) {
      if (user.emailVerified) {
        console.log(`Signed in user ${user.email}`);
      } else {
        sendEmailVerification(user)
          .catch((err) => {
            console.error(err);
          });
      }
    } else if (user === null) {
      console.log("Signed out user");
    } else {
      console.log("Waiting for user credentials");
    }
  }

  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      height="100vh"
      sx={{
        backgroundImage: `url(${bwTrain})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden"
      }}
    >
      <Stack direction="row" height="100vh" sx={{ backgroundColor: "background.default", opacity: 0.85 }}>
        <Stack width={400} spacing={1} padding={2} alignItems="center">
          {user === undefined && <Loading />}
          {user === null && <Login />}
          {user && !user.emailVerified && <Login emailVerificationSent={true} />}
          {user && user.emailVerified && <JoinGame lobby={props.lobby} user={user} onCreateGame={props.onCreateGame} onJoinGame={props.onJoinGame} />}
        </Stack>
      </Stack>
    </Stack>
  );
}