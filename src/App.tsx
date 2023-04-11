import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, CssBaseline, darkScrollbar, GlobalStyles, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import { GameController } from './controllers/GameController';
import { Game } from './pages/Game';
import { Lobby } from './pages/Lobby';
import { LobbyController } from './controllers/LobbyController';

export function App() {
  const [lobby, setLobby] = useState(new LobbyController());
  const [game, setGame] = useState<GameController>();

  const onCreateGame = (game: GameController) => {
    setGame(game);
  }

  const onJoinGame = (game: GameController) => {
    setGame(game);
  }

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles styles={{ ...darkScrollbar() }} />
      <CssBaseline />
      {!game && <Lobby lobby={lobby} onCreateGame={onCreateGame} onJoinGame={onJoinGame} />}
      {game && <Game game={game} />}
    </ThemeProvider>
  );
}