import { GameController } from "./GameController";
import { RemoteLobbyController } from "./RemoteLobbyController";
import { GameMaps } from "../model/GameMaps";

export class LobbyController {
  createGame(playerName: string, avatar: string, map: GameMaps) {
    const gameID = RemoteLobbyController.createGame(map);
    const game = new GameController(gameID);
    const player = game.join(playerName, avatar);
    game.localPlayer = player;
    return game;
  }

  joinGame(gameID: string, playerName: string, avatar: string) {
    const player = RemoteLobbyController.joinGame(gameID, playerName, avatar);
    const game = new GameController(gameID);
    game.localPlayer = player;
    return game;
  }
}