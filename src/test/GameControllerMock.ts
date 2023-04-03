import { GameController } from "../controllers/GameController";
import { Player } from "../model/Player";
import { TrainCard } from "../model/TrainCard";
import { TrainCardColor } from "../model/TrainCardColor";
import { TrainColor } from "../model/TrainColor";
import daphne from './images/daphne.png';
import fred from './images/fred.png';
import scooby from './images/scooby.png';
import shaggy from './images/shaggy.png';
import velma from './images/velma.png';

export class GameControllerMock {
  static LargeGame() {
    const daphnePlayer = new Player('Daphne', daphne);
    const fredPlayer = new Player('Fred', fred);
    const scoobyPlayer = new Player('Scooby Dooby Doo', scooby);
    const shaggyPlayer = new Player('Shaggy', shaggy);
    const velmaPlayer = new Player('Velma', velma);
    const game = new GameController('abc123', daphnePlayer);

    daphnePlayer.color = TrainColor.Black
    fredPlayer.color = TrainColor.Blue;
    scoobyPlayer.color = TrainColor.Green;
    shaggyPlayer.color = TrainColor.Red;
    velmaPlayer.color = TrainColor.Yellow;

    game.startGame();

    daphnePlayer.trainCards.push(new TrainCard(TrainCardColor.Black));
    daphnePlayer.trainCards.push(new TrainCard(TrainCardColor.Blue));
    daphnePlayer.trainCards.push(new TrainCard(TrainCardColor.Green));
    daphnePlayer.trainCards.push(new TrainCard(TrainCardColor.Orange));
    daphnePlayer.trainCards.push(new TrainCard(TrainCardColor.Purple));
    daphnePlayer.trainCards.push(new TrainCard(TrainCardColor.Rainbow));
    daphnePlayer.trainCards.push(new TrainCard(TrainCardColor.Red));
    daphnePlayer.trainCards.push(new TrainCard(TrainCardColor.White));
    daphnePlayer.trainCards.push(new TrainCard(TrainCardColor.Yellow));

    for (let i = 0; i < 9; i++) {
      if (game.destinationCardDeck.length > 0) { daphnePlayer.destinationCards.push(game.drawDestinationCard()!); }
    }

    game.players.push(fredPlayer);
    game.players.push(scoobyPlayer);
    game.players.push(shaggyPlayer);
    game.players.push(velmaPlayer);
    return game;
  }
}