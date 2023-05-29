import { GameController } from "./GameController";
import { RemoteLobbyController } from "./RemoteLobbyController";
import { GameMaps } from "../model/GameMaps";

export class LobbyController {
  createGame(playerName: string, avatar: string, map: GameMaps) {
    const gameID = RemoteLobbyController.createGame(map);
    const game = new GameController(gameID);
    game.join(playerName, avatar);
    return game;
  }

  joinGame(gameID: string, playerName: string, avatar: string) {
    RemoteLobbyController.getGame(gameID);
    const game = new GameController(gameID);
    game.join(playerName, avatar);
    return game;
  }
}