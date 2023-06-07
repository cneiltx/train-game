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
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';

export function App() {
  const lobby = new LobbyController();
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

  const roboto300 = new FontFace('roboto', '@fontsource/roboto/300.css');
  document.fonts.add(roboto300);
  const roboto400 = new FontFace('roboto', '@fontsource/roboto/400.css');
  document.fonts.add(roboto400);
  const roboto500 = new FontFace('roboto', '@fontsource/roboto/500.css');
  document.fonts.add(roboto500);
  const roboto700 = new FontFace('roboto', '@fontsource/roboto/700.css');
  document.fonts.add(roboto700);

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles styles={{ ...darkScrollbar() }} />
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/lobby' element={!game && <Lobby lobby={lobby} onCreateGame={onCreateGame} onJoinGame={onJoinGame} />} />
          <Route path='/game' element={game && <Game game={game} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}