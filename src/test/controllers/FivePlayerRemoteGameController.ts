import { RemoteGameController } from "../../controllers/RemoteGameController";
import daphne from '../images/daphne.png'
import fred from '../images/fred.png';
import shaggy from '../images/shaggy.png';
import velma from '../images/velma.png';

export class FivePlayerRemoteGameController extends RemoteGameController {
  join(name: string, avatar: string) {
    const player = super.join(name, avatar);
    super.join('Daphne', daphne);
    super.join('Fred', fred);
    super.join('Shaggy', shaggy);
    super.join('Velma', velma);
    return player;
  }

  startGame() {
    super.startGame();
    const trainCards = this.trainCardDeck.splice(0);
    this.activePlayer?.trainCards.push(...trainCards);
  }
}