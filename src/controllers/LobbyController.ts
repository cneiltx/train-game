import { GameController } from "./GameController";

export class LobbyController {
  games: GameController[] = [];

  CreateGame() {
    const game = new GameController(this.GenerateGameID());
    this.games.push(game);
    return game;
  }

  private GenerateGameID() {
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