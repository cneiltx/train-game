import { RemoteGameController } from "./RemoteGameController";
import { GameMaps } from "../model/GameMaps";

export class RemoteLobbyController {
  static readonly games: RemoteGameController[] = [];

  static createGame(map: GameMaps) {
    const gameID = this.generateGameID();
    const game = new RemoteGameController(gameID, map);
    this.games.push(game);
    return game.gameID;
  }

  static joinGame(gameID: string, playerName: string, avatar: string) {
    const game = this.games.find(game => game.gameID === gameID);

    if (!game) {
      throw new Error(`No game with ID '${gameID}' exists. Please check the game ID and try again.`);
    }

    const player = game.join(playerName, avatar);
    return player;
  }

  private static generateGameID() {
    const chars = '0123456789';
    let id: string;

    do {
      id = '';
      for (let i = 0; i < 6; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
      }
    } while (this.games.find(game => game.gameID === id));

    return id;
  }
}