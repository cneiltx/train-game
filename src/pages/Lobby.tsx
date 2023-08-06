import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { GameController } from "../controllers/GameController";
import { LobbyController } from "../controllers/LobbyController";
import bwTrain from "../images/backgrounds/bw-train-building.jpeg";
import { User, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { JoinGame } from "./JoinGame";
import { Login } from "./Login";
import { Register } from "./Register";
import { Loading } from "./Loading";
import { firebaseAuth } from "../Firebase";
import { ForgotPassword } from "./ForgotPassword";

export interface LobbyProps {
  lobby: LobbyController;
  onCreateGame: (game: GameController) => void;
  onJoinGame: (game: GameController) => void;
}

export const Lobby = (props: LobbyProps) => {
  const [user, setUser] = useState<User | null>();
  const [register, setRegister] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, handleAuthStateChanged);
    return unsubscribe;
  }, []);

  const handleAuthStateChanged = (user: User | null) => {
    setUser(user);
    setRegister(false);
    setResetPassword(false);

    if (user) {
      if (user.emailVerified) {
        console.log(`Signed in user ${user.email}`);
      } else {
        sendEmailVerification(user)
          .catch((err) => {
            console.error(err);
          });
      }
    } else {
      console.log("Signed out user");
    }
  }

  const handleRegister = () => {
    setRegister(true);
  }

  const handleRegisterCancel = () => {
    setRegister(false);
  }

  const handleForgotPassword = () => {
    setForgotPassword(true);
  }

  const handleForgotPasswordCancel = () => {
    setForgotPassword(false);
  }

  const handleResetPassword = () => {
    setForgotPassword(false);
    setResetPassword(true);
  }

  //TODO: Move Register and ForgotPassword under Login page
  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      minHeight="100vh"
      sx={{
        backgroundImage: `url(${bwTrain})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Stack direction="row" height="100vh" sx={{ backgroundColor: "background.default", opacity: 0.85 }}>
        <Stack width={400} spacing={1} padding={2} alignItems="center">
          {forgotPassword && <ForgotPassword onResetPassword={handleResetPassword} onCancel={handleForgotPasswordCancel} />}
          {resetPassword && <Login onForgotPassword={handleForgotPassword} onRegister={handleRegister}
            info="A password reset email has been sent. The email is from noreply@train-game-e75ed.firebaseapp.com. Please click the link to reset your password, then sign in again. If you don't see the email, check your Spam folder." />}
          {user === undefined && <Loading />}
          {user === null && register && <Register onCancel={handleRegisterCancel} />}
          {user && !user.emailVerified && <Login onForgotPassword={handleForgotPassword} onRegister={handleRegister}
            info="A verification link has been sent to your email. The email is from noreply@train-game-e75ed.firebaseapp.com. Please click the link to verify your email, then sign in again. If you don't see the email, check your Spam folder." />}
          {user === null && !register && !forgotPassword && !resetPassword && <Login onForgotPassword={handleForgotPassword} onRegister={handleRegister} />}
          {user && user.emailVerified && <JoinGame lobby={props.lobby} user={user} onCreateGame={props.onCreateGame} onJoinGame={props.onJoinGame} />}
        </Stack>
      </Stack>
    </Stack>
  );
}