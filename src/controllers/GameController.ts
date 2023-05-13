import { Player } from "../model/Player";
import { TrainCard } from "../model/TrainCard";
import { GameState } from "../model/GameState";
import { Route } from "../model/Route";
import { PlayerState } from "../model/PlayerState";
import { RemoteGameController } from "./RemoteGameController";
import { RemoteLobbyController } from "./RemoteLobbyController";
import { GameMap } from "../model/GameMap";
import { DestinationCard } from "../model/DestinationCard";
import { TrainCardColor } from "../model/TrainCardColor";
import { EnumFunctions } from "../model/EnumFunctions";

export class GameStateChangeEventArgs {
  readonly state: GameState;

  constructor(state: GameState) {
    this.state = state;
  }
}

export class PlayersChangeEventArgs {
  readonly players: Player[];

  constructor(players: Player[]) {
    this.players = players;
  }
}

export class TrainCardDeckChangeEventArgs {
  readonly cards: TrainCard[];

  constructor(cards: TrainCard[]) {
    this.cards = cards;
  }
}

export class FaceUpTrainCardsChangeEventArgs {
  readonly cards: (TrainCard | null)[];

  constructor(cards: (TrainCard | null)[]) {
    this.cards = cards;
  }
}

export class DestinationCardDeckChangeEventArgs {
  readonly cards: DestinationCard[];

  constructor(cards: DestinationCard[]) {
    this.cards = cards;
  }
}

export class PlayerStateChangeEventArgs {
  readonly player: Player;
  readonly state: PlayerState;

  constructor(player: Player, state: PlayerState) {
    this.player = player;
    this.state = state;
  }
}

export class PlayerTrainCardsChangeEventArgs {
  readonly player: Player;
  readonly cards: TrainCard[];

  constructor(player: Player, cards: TrainCard[]) {
    this.player = player;
    this.cards = cards;
  }
}

export class PlayerDestinationCardsChangeEventArgs {
  readonly player: Player;
  readonly cards: DestinationCard[];

  constructor(player: Player, cards: DestinationCard[]) {
    this.player = player;
    this.cards = cards;
  }
}

export class PlayerTrainsChangeEventArgs {
  readonly player: Player;
  readonly trains: number;

  constructor(player: Player, trains: number) {
    this.player = player;
    this.trains = trains;
  }
}

export class PlayerScoreChangeEventArgs {
  readonly player: Player;
  readonly score: number;

  constructor(player: Player, score: number) {
    this.player = player;
    this.score = score;
  }
}

export class MessagesChangeEventArgs {
  readonly messages: string[];

  constructor(messages: string[]) {
    this.messages = messages;
  }
}

/*
 * Raises events:
 *   onGameStateChange
 *   onPlayersChange
 *   onTrainCardDeckChange
 *   onFaceUpTrainCardsChange
 *   onDestinationCardDeckChange
 *   onPlayerStateChange
 *   onPlayerTrainCardsChange
 *   onPlayerDestinationCardsChange
 *   onPlayerTrainsChange
 *   onPlayerScoreChange
 *   onMessagesChange
 */
export class GameController extends EventTarget {
  localPlayer: Player | undefined;
  readonly gameID: string;
  private _state: GameState;
  private _players: Player[];
  private _trainCardDeck: TrainCard[];
  private _faceUpTrainCards: (TrainCard | null)[];
  private _destinationCardDeck: DestinationCard[];
  private _map: GameMap;
  private _messages: string[];
  private _remoteGame: RemoteGameController;
  private _localSelectedTrainCards: TrainCard[] = [];

  constructor(gameID: string) {
    super();
    const remoteGame = RemoteLobbyController.games.find(value => value.gameID === gameID);

    if (remoteGame) {
      this._remoteGame = remoteGame;
      this.gameID = gameID;
      this._state = this._remoteGame.state;
      this._players = [...this._remoteGame.players];
      this._trainCardDeck = [...this._remoteGame.trainCardDeck];
      this._faceUpTrainCards = [...this._remoteGame.faceUpTrainCards];
      this._destinationCardDeck = [...this._remoteGame.destinationCardDeck];
      this._map = { ...this._remoteGame.map };
      this._messages = [...this._remoteGame.messages];
      this._remoteGame.addEventListener('onGameStateChange', (e) => this.handleGameStateChange(e));
      this._remoteGame.addEventListener('onPlayersChange', (e) => this.handlePlayersChange(e));
      this._remoteGame.addEventListener('onTrainCardDeckChange', (e) => this.handleTrainCardDeckChange(e));
      this._remoteGame.addEventListener('onFaceUpTrainCardsChange', (e) => this.handleFaceUpTrainCardsChange(e));
      this._remoteGame.addEventListener('onDestinationCardDeckChange', (e) => this.handleDestinationCardDeckChange(e));
      this._remoteGame.addEventListener('onPlayerStateChange', (e) => this.handlePlayerStateChange(e));
      this._remoteGame.addEventListener('onPlayerTrainCardsChange', (e) => this.handlePlayerTrainCardsChange(e));
      this._remoteGame.addEventListener('onPlayerTrainsChange', (e) => this.handlePlayerTrainsChange(e));
      this._remoteGame.addEventListener('onPlayerScoreChange', (e) => this.handlePlayerScoreChange(e));
      this._remoteGame.addEventListener('onPlayerDestinationCardsChange', (e) => this.handlePlayerDestinationCardsChange(e));
      this._remoteGame.addEventListener('onMessagesChange', (e) => this.handleMessagesChange(e));
    } else {
      throw new Error(`No remote game with ID '${gameID}' exists.`);
    }
  }

  private dispatch(event: string, eventArgs: any) {
    this.dispatchEvent(new CustomEvent(event, { detail: eventArgs }));
  }

  get state() {
    return this._state;
  }

  get players() {
    return this._players;
  }

  get trainCardDeck() {
    return this._trainCardDeck;
  }

  get faceUpTrainCards() {
    return this._faceUpTrainCards;
  }

  get destinationCardDeck() {
    return this._destinationCardDeck;
  }

  get map() {
    return this._map;
  }

  get messages() {
    return this._messages;
  }

  get localSelectedTrainCards() {
    return this._localSelectedTrainCards;
  }

  private handleGameStateChange(e: CustomEventInit<GameStateChangeEventArgs>) {
    this._state = e.detail!.state;
    this.dispatch('onGameStateChange', new GameStateChangeEventArgs(this._state));
  }

  private handlePlayersChange(e: CustomEventInit<PlayersChangeEventArgs>) {
    this._players = [...e.detail!.players];
    this.dispatch('onPlayersChange', new PlayersChangeEventArgs(this._players));
  }

  private handleTrainCardDeckChange(e: CustomEventInit<TrainCardDeckChangeEventArgs>) {
    this._trainCardDeck = [...e.detail!.cards];
    this.dispatch('onTrainCardDeckChange', new TrainCardDeckChangeEventArgs(this._trainCardDeck));
  }

  private handleFaceUpTrainCardsChange(e: CustomEventInit<FaceUpTrainCardsChangeEventArgs>) {
    this._faceUpTrainCards = [...e.detail!.cards];
    this.dispatch('onFaceUpTrainCardsChange', new FaceUpTrainCardsChangeEventArgs(this._faceUpTrainCards));
  }

  private handleDestinationCardDeckChange(e: CustomEventInit<DestinationCardDeckChangeEventArgs>) {
    this._destinationCardDeck = [...e.detail!.cards];
    this.dispatch('onDestinationCardDeckChange', new DestinationCardDeckChangeEventArgs(this._destinationCardDeck));
  }

  private handlePlayerStateChange(e: CustomEventInit<PlayerStateChangeEventArgs>) {
    const player = this._players.find((value) => value.name === e.detail!.player.name);

    if (player) {
      player.state = e.detail!.state;
      this.dispatch('onPlayerStateChange', new PlayerStateChangeEventArgs(player, player.state));
    }
  }

  private handlePlayerTrainCardsChange(e: CustomEventInit<PlayerTrainCardsChangeEventArgs>) {
    const player = this._players.find((value) => value.name === e.detail!.player.name);

    if (player) {
      player.trainCards = [...e.detail!.cards];
      this.dispatch('onPlayerTrainCardsChange', new PlayerTrainCardsChangeEventArgs(player, player.trainCards));
    }
  }

  private handlePlayerDestinationCardsChange(e: CustomEventInit<PlayerDestinationCardsChangeEventArgs>) {
    const player = this._players.find((value) => value.name === e.detail!.player.name);

    if (player) {
      player.destinationCards = [...e.detail!.cards];
      this.dispatch('onPlayerDestinationCardsChange', new PlayerDestinationCardsChangeEventArgs(player, player.destinationCards));
    }
  }

  private handlePlayerTrainsChange(e: CustomEventInit<PlayerTrainsChangeEventArgs>) {
    const player = this._players.find((value) => value.name === e.detail!.player.name);

    if (player) {
      player.trains = e.detail!.trains;
      this.dispatch('onPlayerTrainsChange', new PlayerTrainsChangeEventArgs(player, player.trains));
    }
  }

  private handlePlayerScoreChange(e: CustomEventInit<PlayerScoreChangeEventArgs>) {
    const player = this._players.find((value) => value.name === e.detail!.player.name);

    if (player) {
      player.score = e.detail!.score;
      this.dispatch('onPlayerScoreChange', new PlayerScoreChangeEventArgs(player, player.score));
    }
  }

  private handleMessagesChange(e: CustomEventInit<MessagesChangeEventArgs>) {
    this._messages = [...e.detail!.messages];
    this.dispatch('onMessagesChange', new MessagesChangeEventArgs(this._messages));
  }

  join(name: string, avatar: string): Player | undefined {
    const player = this._remoteGame.join(name, avatar);
    return player;
  }

  startGame() {
    this._remoteGame.startGame();
  }

  drawTrainCardFromDeck() {
    const card = this._remoteGame.drawTrainCardFromDeck();
    return card;
  }

  drawFaceUpTrainCard(card: TrainCard) {
    const drawnCard = this._remoteGame.drawFaceUpTrainCard(card);
    return drawnCard;
  }

  drawDestinationCards() {
    const cards = this._remoteGame.drawDestinationCards();
    return cards;
  }

  discardDestinationCards(cards: DestinationCard[]) {
    this._remoteGame.discardDestinationCards(cards);
  }

  selectableTrainCardsForRoute(route: Route) {
    const colors: TrainCardColor[] = [];
    const wildTotal = this.localPlayer?.trainCards.filter(value => value.color === TrainCardColor.Wild).length ?? 0;

    if (route.color === TrainCardColor.Wild) {
      for (const color of EnumFunctions.getEnumValues(TrainCardColor)) {
        if (color !== TrainCardColor.Wild) {
          const total = this.localPlayer?.trainCards.filter(value => value.color === color).length ?? 0;
          if (total + wildTotal >= route.segments.length) {
            colors.push(color);
          }
        }
      }
    }

    if (colors.length > 0 && wildTotal > 0) {
      colors.push(TrainCardColor.Wild);
    }

    return colors;
  }

  claimRoute(route: Route, cards: TrainCard[]) {
    this._remoteGame.claimRoute(route, cards);
  }
}