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
import { USCities } from "../model/USCities";
import { Message } from "../model/Message";

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

export class PlayerDestinationCardCompleteEventArgs {
  readonly player: Player;
  readonly card: DestinationCard;

  constructor(player: Player, card: DestinationCard) {
    this.player = player;
    this.card = card;
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

export class RouteChangeEventArgs {
  readonly route: Route;

  constructor(route: Route) {
    this.route = route;
  }
}

export class MessagesChangeEventArgs {
  readonly messages: Message[];

  constructor(messages: Message[]) {
    this.messages = messages;
  }
}

export class LocalSelectedTrainCardsChangeEventArgs {
  readonly cards: TrainCard[];

  constructor(cards: TrainCard[]) {
    this.cards = cards;
  }
}

export class LocalSelectedCitiesChangeEventArgs {
  readonly cities: USCities[];

  constructor(cities: USCities[]) {
    this.cities = cities;
  }
}

export class LocalSelectedRouteChangeEventArgs {
  readonly route: Route | null;

  constructor(route: Route | null) {
    this.route = route;
  }
}

/*
 * Raises remote events:
 *   onGameStateChange
 *   onPlayersChange
 *   onTrainCardDeckChange
 *   onFaceUpTrainCardsChange
 *   onDestinationCardDeckChange
 *   onPlayerStateChange
 *   onPlayerTrainCardsChange
 *   onPlayerDestinationCardsChange
 *   onPlayerDestinationCardComplete
 *   onPlayerTrainsChange
 *   onPlayerScoreChange
 *   onRouteChange
 *   onMessagesChange
 * 
 * Raises local events:
 *   onLocalSelectedTrainCardsChange
 *   onLocalSelectedCitiesChange
 *   onLocalSelectedRouteChange
 *   onLocalMessagesChange
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
  private _messages: Message[];
  private _remoteGame: RemoteGameController;
  private _localSelectedTrainCards: TrainCard[] = [];
  private _localSelectedCities: USCities[] = [];
  private _localSelectedRoute: (Route | null) = null;
  private _localMessages: Message[] = [];

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
      this._remoteGame.addEventListener('onPlayerDestinationCardComplete', (e) => this.handlePlayerDestinationCardComplete(e));
      this._remoteGame.addEventListener('onRouteChange', (e) => this.handleRouteChange(e));
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

  get localSelectedCities() {
    return this._localSelectedCities;
  }

  get localSelectedRoute() {
    return this._localSelectedRoute;
  }

  get localMessages() {
    return this._localMessages;
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

  private handlePlayerDestinationCardComplete(e: CustomEventInit<PlayerDestinationCardCompleteEventArgs>) {
    if (this.localPlayer && this.localPlayer.name === e.detail?.player.name) {
      const cardIndex = this.localPlayer?.destinationCards.findIndex(value => value.id === e.detail!.card.id);
      this.localPlayer.destinationCards[cardIndex] = e.detail!.card;
      this.dispatch('onPlayerDestinationCardComplete', new PlayerDestinationCardCompleteEventArgs(e.detail!.player, e.detail!.card));
      this.addLocalMessage(
        `You connected ${this.map.cities.find(value => value.city === e.detail!.card.city1)?.name} and ${this.map.cities.find(value => value.city === e.detail!.card.city2)?.name}!`,
        true);
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

  private handleRouteChange(e: CustomEventInit<RouteChangeEventArgs>) {
    const routeIndex = this._map.routes.findIndex(value => value.id === e.detail!.route.id);
    this._map.routes[routeIndex] = e.detail!.route;
    this.dispatch('onRouteChange', new RouteChangeEventArgs(e.detail!.route));
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

  private abandonClaimRoute() {
    if (this._localSelectedRoute) {
      this._localSelectedRoute = null;
      this.dispatch('onLocalSelectedRouteChange', new LocalSelectedRouteChangeEventArgs(this._localSelectedRoute));
    }

    if (this.localPlayer && this._localSelectedTrainCards.length > 0) {
      this.localPlayer.trainCards.push(...this._localSelectedTrainCards);
      this._localSelectedTrainCards = [];
      this.dispatch('onLocalSelectedTrainCardsChange', new LocalSelectedTrainCardsChangeEventArgs(this._localSelectedTrainCards));
      this.dispatch('onPlayerTrainCardsChange', new PlayerTrainCardsChangeEventArgs(this.localPlayer, this.localPlayer.trainCards));
    }
  }

  private addLocalMessage(message: string, priority = false) {
    this._localMessages.push(new Message(message, priority));

    if (this._localMessages.length > 10) {
      this._localMessages.splice(0, 1);
    }

    this.dispatch('onLocalMessagesChange', new MessagesChangeEventArgs(this._localMessages));
  }

  drawTrainCardFromDeck() {
    this.abandonClaimRoute();
    const card = this._remoteGame.drawTrainCardFromDeck();
    return card;
  }

  drawFaceUpTrainCard(card: TrainCard) {
    this.abandonClaimRoute();
    const drawnCard = this._remoteGame.drawFaceUpTrainCard(card);
    return drawnCard;
  }

  drawDestinationCards() {
    this.abandonClaimRoute();
    const cards = this._remoteGame.drawDestinationCards();
    return cards;
  }

  discardDestinationCards(cards: DestinationCard[]) {
    this._remoteGame.discardDestinationCards(cards);
  }

  selectCities(cities: USCities[]) {
    this._localSelectedCities = cities;
    this.dispatch('onLocalSelectedCitiesChange', new LocalSelectedCitiesChangeEventArgs(cities));
  }

  selectRoute(route: Route) {
    this.abandonClaimRoute();

    if (this.localPlayer) {
      if (this._localSelectedTrainCards.length > 0) {
        this.localPlayer.trainCards.push(...this.localSelectedTrainCards);
        this._localSelectedTrainCards = [];
        this.dispatch('onLocalSelectedTrainCardsChange', new LocalSelectedTrainCardsChangeEventArgs(this._localSelectedTrainCards));
        this.dispatch('onPlayerTrainCardsChange', new PlayerTrainCardsChangeEventArgs(this.localPlayer, this.localPlayer.trainCards));
      }

      this._localSelectedRoute = route;
      this.dispatch('onLocalSelectedRouteChange', new LocalSelectedRouteChangeEventArgs(route));
    }
  }

  selectableTrainCardsForRoute(route: Route) {
    const colors: TrainCardColor[] = [];

    if (route.segments.length <= this._localSelectedTrainCards.length) {
      return colors;
    }

    if (this.localPlayer) {
      const wildTotal = this.localPlayer.trainCards.filter(value => value.color === TrainCardColor.Wild).length
        + this._localSelectedTrainCards.filter(value => value.color === TrainCardColor.Wild).length;

      if (route.color === TrainCardColor.Wild) {
        for (const color of EnumFunctions.getEnumValues(TrainCardColor)) {
          if (color !== TrainCardColor.Wild) {
            const total = this.localPlayer.trainCards.filter(value => value.color === color).length
              + this._localSelectedTrainCards.filter(value => value.color === color).length;
            if (total + wildTotal >= route.segments.length) {
              colors.push(color);
            }
          }
        }
      } else {
        const total = this.localPlayer.trainCards.filter(value => value.color === route.color).length
          + this._localSelectedTrainCards.filter(value => value.color === route.color).length;
        if (total + wildTotal >= route.segments.length) {
          colors.push(route.color);
        }
      }

      if (colors.length > 0 && wildTotal > 0) {
        colors.push(TrainCardColor.Wild);
      }
    }

    return colors;
  }

  selectTrainCard(card: TrainCard) {
    if (this.localPlayer) {
      const cardIndex = this.localPlayer.trainCards.findIndex(value => value.id === card.id);

      if (cardIndex >= 0) {
        const deletedCards = this.localPlayer.trainCards.splice(cardIndex, 1);
        this.dispatch('onPlayerTrainCardsChange', new PlayerTrainCardsChangeEventArgs(this.localPlayer, this.localPlayer.trainCards));

        if (deletedCards.length > 0) {
          this._localSelectedTrainCards.push(deletedCards[0]);
          this.dispatch('onLocalSelectedTrainCardsChange', new LocalSelectedTrainCardsChangeEventArgs(this._localSelectedTrainCards));
        }
      }
    }
  }

  unselectTrainCard(card: TrainCard) {
    if (this.localPlayer) {
      const cardIndex = this._localSelectedTrainCards.findIndex(value => value.id === card.id);

      if (cardIndex >= 0) {
        const deletedCards = this._localSelectedTrainCards.splice(cardIndex, 1);
        this.dispatch('onLocalSelectedTrainCardsChange', new LocalSelectedTrainCardsChangeEventArgs(this._localSelectedTrainCards));

        if (deletedCards.length > 0) {
          this.localPlayer.trainCards.push(deletedCards[0]);
          this.dispatch('onPlayerTrainCardsChange', new PlayerTrainCardsChangeEventArgs(this.localPlayer, this.localPlayer.trainCards));
        }
      }
    }
  }

  claimRoute(route: Route, cards: TrainCard[]) {
    const routeCards = [...this._localSelectedTrainCards];
    this.abandonClaimRoute();
    this._remoteGame.claimRoute(route, routeCards);
  }
}