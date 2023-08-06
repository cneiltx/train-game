import { GameController } from "./GameController";
import { GameMaps } from "../model/GameMaps";

export class LobbyController {
  private _games: GameController[] = [];

  createGame(playerName: string, avatar: string, map: GameMaps) {
    const gameID = this.generateGameID();
    const game = new GameController(gameID, map);
    this._games.push(game);
    game.join(playerName, avatar);
    return game;
  }

  joinGame(gameID: string, playerName: string, avatar: string) {
    const game = this._games.find(game => game.gameID === gameID);

    if (!game) {
      throw new Error(`No game with ID ${gameID} exists. Please check the game ID and try again.`);
    }

    game.join(playerName, avatar);
    return game;
  }

  private generateGameID() {
    const chars = "0123456789";
    let id: string;

    do {
      id = "";
      for (let i = 0; i < 6; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
      }
    } while (this._games.find(game => game.gameID === id));

    return id;
  }
}