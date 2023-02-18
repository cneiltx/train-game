import React from 'react';
import './App.css';
import { Gameboard } from './components/Gameboard';

// HD = 1920 x 1080
// Left Player Board = 285
// Right Card Board = 210
// Bottom Board = 170
// Game Board = 1425 x 910

function App() {
  return (
    <div className="App">
      <Gameboard width='1425px' height='910px' />
    </div>
  );
}

export default App;
