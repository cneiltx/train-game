import { GameController } from "./GameController";
import daphne from '../test/images/daphne.png'
import fred from '../test/images/fred.png';
import shaggy from '../test/images/shaggy.png';
import velma from '../test/images/velma.png';
import { RemoteLobbyController } from "./RemoteLobbyController";
import { GameMaps } from "../model/GameMaps";

export class LobbyController {
  createGame(playerName: string, avatar: string, map: GameMaps) {
    const gameID = RemoteLobbyController.createGame(map);
    const game = new GameController(gameID);
    const player = game.join(playerName, avatar);
    game.localPlayer = player;

    game.join('Daphne', daphne);
    game.join('Fred', fred);
    game.join('Shaggy', shaggy);
    game.join('Velma', velma);

    return game;
  }

  joinGame(gameID: string, playerName: string, avatar: string) {
    const player = RemoteLobbyController.joinGame(gameID, playerName, avatar);
    const game = new GameController(gameID);
    game.localPlayer = player;
    return game;
  }
}