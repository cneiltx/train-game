import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import { GameController } from './controllers/GameController';
import { Game } from './pages/Game';
import { Lobby } from './pages/Lobby';

export function App() {
  const [game, setGame] = useState<GameController>();

  const onCreateGame = (game: GameController) => {
    game.startGame(); // TODO: Remove
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
      <CssBaseline />
      {!game && <Lobby onCreateGame={onCreateGame} onJoinGame={onJoinGame} />}
      {game && <Game game={game} />}
    </ThemeProvider>
  );
}