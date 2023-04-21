import { Player } from "../model/Player";
import { GameControllerMock } from "../test/GameControllerMock";
import { GameController } from "./GameController";

export class LobbyController {
  readonly games: GameController[] = [];

  createGame(player: Player) {
    // const game = new GameController(this.generateGameID(), player);
    const game = GameControllerMock.LargeGame();
    this.games.push(game);
    return game;
  }

  joinGame(gameID: string, player: Player) {
    const game = this.games.find(game => game.gameID === gameID);

    if (!game) {
      throw new Error(`No game with ID ${gameID} exists. Please check the game ID and try again.`);
    }

    game.join(player);
    return game;
  }

  private generateGameID() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let id: string;

    do {
      id = '';
      for (let i = 0; i < 6; i++) {
        id.concat(chars[Math.floor(Math.random() * chars.length)]);
      }
    } while (this.games.find(game => game.gameID === id));

    return id;
  }
}