import { GameStatus } from "../model/GameStatus";
import { Player } from "../model/Player";
import { GameController } from "./GameController";

export class LobbyController {
  games: GameController[] = [];

  createGame(player: Player) {
    const game = new GameController(this.generateGameID(), player);
    this.games.push(game);
    return game;
  }

  joinGame(gameID: string, player: Player) {
    const game = this.games.find(game => game.gameID === gameID);

    if (!game) {
      throw new Error(`No game with ID ${gameID} exists. Please check the game ID and try again.`);
    }

    if (game.status === GameStatus.Playing) {
      throw new Error('You cannot join because this game is already in progress.');
    }

    if (game.status === GameStatus.Completed) {
      throw new Error('This game has already completed. Please create a new game.');
    }

    game.players.push(player);
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