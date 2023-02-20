import './App.css';
import { ActivePlayerArea } from './components/ActivePlayerArea';
import { DrawCardArea } from './components/DrawCardArea';
import { Gameboard } from './components/Gameboard';
import { PlayersArea } from './components/PlayersArea';

function App() {
  return (
    <div className="App">
      <PlayersArea />
      <Gameboard width={1425} />
      <DrawCardArea />
      <ActivePlayerArea />
    </div>
  );
}

export default App;
