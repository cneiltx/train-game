// TODO: Delete this class
import { Player } from "../model/Player";
import { DestinationCard } from "../model/DestinationCard";
import { TrainCard } from "../model/TrainCard";
import { USCities } from "../model/USCities";
import { GameState } from "../model/GameState";
import { TrainCardColor } from "../model/TrainCardColor";
import { EnumFunctions } from "../model/EnumFunctions";
import { Route } from "../model/Route";
import { TrainColor } from "../model/TrainColor";
import { PlayerState } from "../model/PlayerState";
import { GameMap } from "../model/GameMap";
import { GameMaps } from "../model/GameMaps";
import { USMap } from "../model/USMap";
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
 *   onPlayerDestinationCardComplete
 *   onPlayerTrainsChange
 *   onPlayerScoreChange
 *   onRouteChange
 *   onMessagesChange
 */
export class RemoteGameController extends EventTarget {
  readonly gameID: string;
  readonly players: Player[] = [];
  readonly trainCardDeck: TrainCard[] = [];
  readonly faceUpTrainCards: (TrainCard | null)[] = [null, null, null, null, null];
  readonly discardedTrainCards: TrainCard[] = [];
  readonly destinationCardDeck: DestinationCard[] = [];
  readonly map: GameMap;
  readonly messages: Message[] = [];
  private _state = GameState.Initializing;
  private _drawnDestinationCards: DestinationCard[] = [];
  private _finalPlayer: Player | null = null;

  constructor(gameID: string, map: GameMaps) {
    super();
    this.gameID = gameID;

    switch (map) {
      case GameMaps.US:
        this.map = new USMap();
        break;
    }
  }

  private dispatch(event: string, eventArgs: any) {
    this.dispatchEvent(new CustomEvent(event, { detail: eventArgs }));
  }

  get state() {
    return this._state;
  }

  private set state(state: GameState) {
    if (this.state !== state) {
      if (this._state === GameState.Initializing && state === GameState.Playing) {
        this.addMessage('The game is now starting.');
      }

      this._state = state;
      this.dispatch('onGameStateChange', new GameStateChangeEventArgs(state));
    }
  }

  private get activePlayer() {
    return this.players.find(value => value.state !== PlayerState.Waiting);
  }

  private nextPlayer() {
    const prevPlayer = this.activePlayer;
    let nextPlayer;

    if (prevPlayer) {
      const prevIndex = this.players.findIndex(value => value.name === prevPlayer.name);

      if (prevPlayer.state === PlayerState.DrawingDestinationCards) {
        prevPlayer.destinationCards.push(...this._drawnDestinationCards);
        this.dispatch('onPlayerDestinationCardsChange', new PlayerDestinationCardsChangeEventArgs(prevPlayer, prevPlayer.destinationCards));
        this.addMessage(`${this.activePlayer?.name} took ${this._drawnDestinationCards.length} destination card${this._drawnDestinationCards.length > 1 ? 's' : ''}.`);
        this._drawnDestinationCards = [];
      }

      if (prevIndex < this.players.length - 1) {
        nextPlayer = this.players[prevIndex + 1];
      } else {
        nextPlayer = this.players[0];
      }

      if (this._finalPlayer?.name === this.activePlayer?.name) {
        this.endGame();
      }

      if (prevPlayer.trains <= 2 && !this._finalPlayer) {
        this.addMessage(`This is the final round since ${prevPlayer.name} has ${prevPlayer.trains > 0 ? 'only ' + prevPlayer.trains : 'no'} remaining train${prevPlayer.trains === 1 ? '' : 's'}!`, true);
        this._finalPlayer = prevPlayer;
      }

      prevPlayer.state = PlayerState.Waiting;
      this.dispatch('onPlayerStateChange', new PlayerStateChangeEventArgs(prevPlayer, prevPlayer.state));
    } else {
      nextPlayer = this.players[0];
    }

    this._drawnDestinationCards = [];
    nextPlayer.state = PlayerState.StartingTurn;
    this.addMessage(`It is now ${nextPlayer.name}'s turn.`);
    this.dispatch('onPlayerStateChange', new PlayerStateChangeEventArgs(nextPlayer, nextPlayer.state));
  }

  private endGame() {
    const tallyDelay = 2000;
    this.addMessage('The game is over. Tallying scores...');
    const longestRoutes = this.getLongestRoutes();
    const longestRouteLengths = new Map<string, number>();
    let longestRouteLength = 0;

    for (const player of this.players) {
      for (const card of player.destinationCards.filter(value => value.complete)) {
        player.score += card.points;
        this.addMessage(`${player.name} gets ${card.points} points for connecting ${this.map.cities.find(value => value.city === card.city1)?.name} and ${this.map.cities.find(value => value.city === card.city2)?.name}.`)
        this.dispatch('onPlayerScoreChange', new PlayerScoreChangeEventArgs(player, player.score));
      }

      for (const card of player.destinationCards.filter(value => !value.complete)) {
        player.score -= card.points;
        this.addMessage(`${player.name} loses ${card.points} points for not connecting ${this.map.cities.find(value => value.city === card.city1)?.name} and ${this.map.cities.find(value => value.city === card.city2)?.name}.`)
        this.dispatch('onPlayerScoreChange', new PlayerScoreChangeEventArgs(player, player.score));
      }

      const playerLongestRouteLength = longestRoutes.get(player.name)?.reduce((a, b) => a + b.segments.length, 0) ?? 0;
      longestRouteLengths.set(player.name, playerLongestRouteLength);

      if (playerLongestRouteLength > longestRouteLength) {
        longestRouteLength = playerLongestRouteLength;
      }

      if (playerLongestRouteLength === 0) {
        this.addMessage(`${player.name} has no routes.`);
      } else {
        this.addMessage(`${player.name}'s longest continuous path is ${playerLongestRouteLength} car${playerLongestRouteLength === 1 ? '' : 's'}.`);
      }
    }

    const longestPlayers: Player[] = [];

    longestRouteLengths.forEach((length, name) => {
      if (length === longestRouteLength) {
        longestPlayers.push(this.players.find(value => value.name === name)!);
      }
    });

    for (const player of longestPlayers) {
      player.score += 10;
      this.dispatch('onPlayerScoreChange', new PlayerScoreChangeEventArgs(player, player.score));
    }

    this.addMessage(`${this.joinNames(longestPlayers.map(value => value.name))} get${longestPlayers.length === 1 ? 's' : ''} 10 points for having the longest continuous path${longestPlayers.length === 1 ? '' : 's'}.`, true);
    const highestScore = this.players.reduce((a, b) => Math.max(a, b.score), 0);
    const tiedWinners = this.players.filter(value => value.score === highestScore);

    if (tiedWinners.length === 1) {
      this.addMessage(`${tiedWinners[0].name} is the winner. Congratulations!`, true);
    } else {
      const mostCompletedDestinations = tiedWinners.reduce((a, b) => Math.max(a, b.destinationCards.filter(value => value.complete).length), 0);
      const tiedCompletedDestinations = tiedWinners.filter(value => value.destinationCards.filter(card => card.complete).length === mostCompletedDestinations);

      if (tiedCompletedDestinations.length === 1) {
        this.addMessage(`${this.joinNames(tiedWinners.map(value => value.name))} are tied for highest score but ${tiedCompletedDestinations[0].name} wins for having the most (${mostCompletedDestinations}) completed destination cards. Congratulations!`, true);
      } else {
        const longestPathHolders = tiedCompletedDestinations.filter(value => longestPlayers.map(player => player.name).includes(value.name));

        if (longestPathHolders.length === 0) {
          this.addMessage(`${this.joinNames(tiedCompletedDestinations.map(value => value.name))} are tied winners with highest score and most (${mostCompletedDestinations}) completed destination cards. Congratulations!`, true);
        } else if (longestPathHolders.length === 1) {
          this.addMessage(`${this.joinNames(tiedCompletedDestinations.map(value => value.name))} are tied for highest score and most (${mostCompletedDestinations}) completed destination cards, but ${longestPathHolders[0].name} wins for having the longest continuous path. Congratulations!`, true);
        } else {
          this.addMessage(`${this.joinNames(longestPathHolders.map(value => value.name))} are tied winners with highest score, most (${mostCompletedDestinations}) completed destination cards, and longest continuous paths! Congratulations!`, true);
        }
      }
    }
  }

  private joinNames(names: string[]) {
    return names.join(', ').replace(/,\s([^,]+)$/, ' and $1');
  }

  private getLongestRoutes() {
    const longestRoutes = new Map<string, Route[]>();

    for (const player of this.players) {
      longestRoutes.set(player.name, []);

      for (const city of EnumFunctions.getEnumValues(USCities)) {
        const connectedRoutes = this.map.routes.filter(value => value.train === player.color && (value.city1 === city || value.city2 === city));
        const visitedRoutes = new Map<number, Route>();
        let longestConnectedRoute: Route[] = [];
        let secondLongestConnectedRoute: Route[] = [];

        for (const connectedRoute of connectedRoutes) {
          const longestRoute = this.getLongestRoute(connectedRoute, city, visitedRoutes);
          const length = longestRoute.reduce((a, b) => a + b.segments.length, 0);

          if (length > longestConnectedRoute.reduce((a, b) => a + b.segments.length, 0)) {
            secondLongestConnectedRoute = longestConnectedRoute;
            longestConnectedRoute = longestRoute;
          } else if (length > secondLongestConnectedRoute.reduce((a, b) => a + b.segments.length, 0)) {
            secondLongestConnectedRoute = longestRoute;
          }
        }

        if (longestConnectedRoute.reduce((a, b) => a + b.segments.length, 0) + secondLongestConnectedRoute.reduce((a, b) => a + b.segments.length, 0)
          > longestRoutes.get(player.name)!.reduce((a, b) => a + b.segments.length, 0)) {
          longestRoutes.set(player.name, [...longestConnectedRoute, ...secondLongestConnectedRoute]);
        }
      }
    }

    return longestRoutes;
  }

  private getLongestRoute(route: Route, startCity: USCities, visitedRoutes: Map<number, Route>) {
    visitedRoutes.set(route.id, route);
    let targetCity: USCities;

    if (route.city1 === startCity) {
      targetCity = route.city2;
    } else {
      targetCity = route.city1;
    }

    const connectedRoutes = this.map.routes.filter(value => value.train === route.train && (value.city1 === targetCity || value.city2 === targetCity)
      && !visitedRoutes.has(value.id));
    let longestConnectedRoute: Route[] = [];

    for (const connectedRoute of connectedRoutes) {
      const longestRoute = this.getLongestRoute(connectedRoute, targetCity, visitedRoutes);

      if (longestRoute.reduce((a, b) => a + b.segments.length, 0) > longestConnectedRoute.reduce((a, b) => a + b.segments.length, 0)) {
        longestConnectedRoute = longestRoute;
      }
    }

    return [route, ...longestConnectedRoute];
  }

  private addMessage(message: string, priority = false) {
    this.messages.push(new Message(message, priority));

    if (this.messages.length > 10) {
      this.messages.splice(0, 1);
    }

    this.dispatch('onMessagesChange', new MessagesChangeEventArgs(this.messages));
  }

  availableTrainCardCount() {
    return this.trainCardDeck.length + this.faceUpTrainCards.filter(value => value).length + this.discardedTrainCards.length;
  }

  join(name: string, avatar: string) {
    if (this.state !== GameState.Initializing) {
      throw new Error('You cannot join because this game it is not in Initializing status.');
    } else if (this.players.find((item) => item.name.toLowerCase() === name.toLowerCase())) {
      throw new Error(`A player named '${name}' already exists in this game. Please use a different name.`);
    } else if (this.players.length > 4) {
      throw new Error('You cannot join because there are already 5 players in the game.');
    } else {
      for (const color of EnumFunctions.getEnumValues(TrainColor)) {
        if (!this.players.find(value => value.color === color)) {
          const player = new Player(name, avatar, color);
          this.players.push(player);
          this.addMessage(`${name} joined the game.`);
          this.dispatch('onPlayersChange', new PlayersChangeEventArgs(this.players));
          return player;
        }
      }
    }
  }

  startGame() {
    if (this.state !== GameState.Initializing) {
      throw new Error('This game cannot be started because it is not in Initializing status.');
    } else if (this.players.length < 2) {
      throw new Error('This game cannot be started with less than 2 players.');
    } else {
      this.state = GameState.Playing;
      this.initializeTrainCards();
      this.initializeDestinationCards();
      this.dealTrainCards();
      this.dealDestinationCards();
      this.nextPlayer();
    }
  }

  drawTrainCardFromDeck() {
    if (this.activePlayer) {
      const card = this.drawTrainCard();

      if (card) {
        this.activePlayer.trainCards.push(card);
        this.addMessage(`${this.activePlayer.name} drew a train card from the deck.`);
        this.dispatch('onPlayerTrainCardsChange', new PlayerTrainCardsChangeEventArgs(this.activePlayer, this.activePlayer.trainCards));

        if (this.activePlayer.state === PlayerState.StartingTurn && this.availableTrainCardCount() > 0) {
          this.activePlayer.state = PlayerState.DrawingTrainCards;
          this.dispatch('onPlayerStateChange', new PlayerStateChangeEventArgs(this.activePlayer, this.activePlayer.state));
        } else {
          this.nextPlayer();
        }
      }

      return card;
    }
  }

  drawFaceUpTrainCard(card: TrainCard) {
    if (this.activePlayer) {
      const index = this.faceUpTrainCards.findIndex((item) => card.id === item?.id);

      if (index >= 0) {
        this.activePlayer.trainCards.push(card);
        const newCard = this.drawTrainCard();
        this.faceUpTrainCards[index] = newCard;

        let shuffleAttempts = 20;
        while (shuffleAttempts > 0 && this.faceUpTrainCards.filter(value => value?.color === TrainCardColor.Wild).length > 2) {
          for (let i = 0; i < 5; i++) {
            const card = this.drawTrainCard();
            this.faceUpTrainCards[i] = card;
          }
          shuffleAttempts--;
        }

        this.addMessage(`${this.activePlayer.name} drew a${'aeiou'.includes(EnumFunctions.getName(card.color)[0]) ? 'n' : ''} `.concat(
          `${EnumFunctions.getName(card.color)} face up train card.`));
        this.dispatch('onFaceUpTrainCardsChange', new FaceUpTrainCardsChangeEventArgs(this.faceUpTrainCards));
        this.dispatch('onPlayerTrainCardsChange', new PlayerTrainCardsChangeEventArgs(this.activePlayer, this.activePlayer.trainCards));

        if (this.activePlayer.state === PlayerState.StartingTurn && card.color !== TrainCardColor.Wild && this.availableTrainCardCount() > 0) {
          this.activePlayer.state = PlayerState.DrawingTrainCards;
          this.dispatch('onPlayerStateChange', new PlayerStateChangeEventArgs(this.activePlayer, this.activePlayer.state));
        } else {
          this.nextPlayer();
        }

        return card;
      } else {
        return undefined;
      }
    }
  }

  drawDestinationCards() {
    this._drawnDestinationCards = [];

    if (this.activePlayer) {
      this.activePlayer.state = PlayerState.DrawingDestinationCards;
      this.dispatch('onPlayerStateChange', new PlayerStateChangeEventArgs(this.activePlayer, this.activePlayer.state));

      for (let draws = 0; draws < 3; draws++) {
        const card = this.drawDestinationCard();

        if (card) {
          if (this.areCitiesConnected(card.city1, card.city2)) {
            card.complete = true;
          }

          this._drawnDestinationCards.push(card);
        }
      }
    }

    return this._drawnDestinationCards;
  }

  discardDestinationCards(cards: DestinationCard[]) {
    for (let index = this._drawnDestinationCards.length - 1; index >= 0; index--) {
      const card = this._drawnDestinationCards[index];

      if (cards.find(value => value.id === card.id)) {
        card.complete = false;
        this.destinationCardDeck.unshift(card);
        this._drawnDestinationCards.splice(index, 1);
      }
    }

    this.nextPlayer();
  }

  claimRoute(route: Route, cards: TrainCard[]) {
    if (this.activePlayer) {
      this.activePlayer.trains -= route.segments.length;

      for (const card of cards) {
        this.activePlayer.trainCards.splice(this.activePlayer.trainCards.findIndex((value) => value.id === card.id), 1);
        this.discardedTrainCards.push(card);
      }

      route.train = this.activePlayer.color;
      this.dispatch('onRouteChange', new RouteChangeEventArgs(route));
      const doubleRoute = this.map.routes.find(value => value.id !== route.id
        && ((value.city1 === route.city1 && value.city2 === route.city2)
          || (value.city1 === route.city2 && value.city2 === route.city1)));

      if (doubleRoute) {
        doubleRoute.unavailableFor = this.activePlayer;

        if (this.players.length < 4) {
          doubleRoute.available = false;
        }

        this.dispatch('onRouteChange', new RouteChangeEventArgs(doubleRoute));
      }

      let points = 0;

      switch (route.segments.length) {
        case 1:
          points = 1;
          break;
        case 2:
          points = 2;
          break;
        case 3:
          points = 4;
          break;
        case 4:
          points = 7;
          break;
        case 5:
          points = 10;
          break;
        case 6:
          points = 15;
          break;
      }

      this.activePlayer.score += points;
      const city1 = this.map.cities.find(value => value.city === route.city1);
      const city2 = this.map.cities.find(value => value.city === route.city2);
      this.dispatch('onPlayerTrainsChange', new PlayerTrainsChangeEventArgs(this.activePlayer, this.activePlayer.trains));
      this.dispatch('onPlayerTrainCardsChange', new PlayerTrainCardsChangeEventArgs(this.activePlayer, this.activePlayer.trainCards));
      this.dispatch('onPlayerScoreChange', new PlayerScoreChangeEventArgs(this.activePlayer, this.activePlayer.score));

      if (city1 && city2) {
        this.addMessage(`${this.activePlayer.name} earned ${points} points for claiming route ${city1.name} - ${city2.name}`);
      }

      for (const card of this.activePlayer.destinationCards.filter(value => !value.complete)) {
        if (this.areCitiesConnected(card.city1, card.city2)) {
          card.complete = true;
          this.dispatch('onPlayerDestinationCardComplete', new PlayerDestinationCardCompleteEventArgs(this.activePlayer, card));
        }
      }

      this.nextPlayer();
    }
  }

  private areCitiesConnected(city1: USCities, city2: USCities) {
    const visitedCities = new Set<USCities>();
    const citiesToVisit = [city1];

    while (citiesToVisit.length > 0) {
      const city = citiesToVisit.pop()!;
      visitedCities.add(city);

      for (const route of this.map.routes.filter(value => value.train === this.activePlayer?.color && (value.city1 === city || value.city2 === city))) {
        let targetCity: USCities;

        if (route.city1 === city) {
          targetCity = city2;
        } else {
          targetCity = city1;
        }

        if (!visitedCities.has(targetCity)) {
          if (targetCity === city2) {
            return true;
          } else {
            citiesToVisit.push(targetCity);
          }
        }
      }
    }

    return false;
  }

  private initializeTrainCards() {
    let id = 0;
    for (const color of EnumFunctions.getEnumValues(TrainCardColor)) {
      for (let i = 0; i < 12; i++) {
        this.trainCardDeck.push(new TrainCard(id++, color));
      }
    }

    this.trainCardDeck.push(new TrainCard(id++, TrainCardColor.Wild));
    this.trainCardDeck.push(new TrainCard(id++, TrainCardColor.Wild));
    this.shuffle(this.trainCardDeck);
  }

  private initializeDestinationCards() {
    let id = 0;
    this.destinationCardDeck.push(new DestinationCard(id++, USCities.Billings, USCities.LosAngeles, 8));
    this.destinationCardDeck.push(new DestinationCard(id++, USCities.Boston, USCities.Miami, 12));
    this.destinationCardDeck.push(new DestinationCard(id++, USCities.Calgary, USCities.Phoenix, 13));
    this.destinationCardDeck.push(new DestinationCard(id++, USCities.Calgary, USCities.SaltLakeCity, 7));
    this.destinationCardDeck.push(new DestinationCard(id++, USCities.Chicago, USCities.NewOrleans, 7));
    this.destinationCardDeck.push(new DestinationCard(id++, USCities.Chicago, USCities.SantaFe, 9));
    this.destinationCardDeck.push(new DestinationCard(id++, USCities.Dallas, USCities.NewYork, 11));
    this.destinationCardDeck.push(new DestinationCard(id++, USCities.Denver, USCities.ElPaso, 4));
    this.destinationCardDeck.push(new DestinationCard(id++, USCities.Denver, USCities.Pittsburgh, 11));
    this.destinationCardDeck.push(new DestinationCard(id++, USCities.KansasCity, USCities.Houston, 5));
    this.destinationCardDeck.push(new DestinationCard(id++, USCities.LosAngeles, USCities.Chicago, 16));
    this.destinationCardDeck.push(new DestinationCard(id++, USCities.LosAngeles, USCities.Miami, 20));
    this.destinationCardDeck.push(new DestinationCard(id++, USCities.LosAngeles, USCities.NewYork, 21));
    this.destinationCardDeck.push(new DestinationCard(id++, USCities.Minneapolis, USCities.ElPaso, 10));
    this.destinationCardDeck.push(new DestinationCard(id++, USCities.Minneapolis, USCities.Houston, 8));
    this.destinationCardDeck.push(new DestinationCard(id++, USCities.Montreal, USCities.Atlanta, 9));
    this.destinationCardDeck.push(new DestinationCard(id++, USCities.Montreal, USCities.NewOrleans, 13));
    this.destinationCardDeck.push(new DestinationCard(id++, USCities.NewYork, USCities.Atlanta, 6));
    this.destinationCardDeck.push(new DestinationCard(id++, USCities.Portland, USCities.Nashville, 17));
    this.destinationCardDeck.push(new DestinationCard(id++, USCities.Portland, USCities.Phoenix, 11));
    this.destinationCardDeck.push(new DestinationCard(id++, USCities.SanFrancisco, USCities.Atlanta, 17));
    this.destinationCardDeck.push(new DestinationCard(id++, USCities.SaultSteMarie, USCities.Nashville, 8));
    this.destinationCardDeck.push(new DestinationCard(id++, USCities.SaultSteMarie, USCities.OklahomaCity, 9));
    this.destinationCardDeck.push(new DestinationCard(id++, USCities.Seattle, USCities.LosAngeles, 9));
    this.destinationCardDeck.push(new DestinationCard(id++, USCities.Seattle, USCities.NewYork, 22));
    this.destinationCardDeck.push(new DestinationCard(id++, USCities.Toronto, USCities.Miami, 10));
    this.destinationCardDeck.push(new DestinationCard(id++, USCities.Vancouver, USCities.SantaFe, 13));
    this.destinationCardDeck.push(new DestinationCard(id++, USCities.Winnipeg, USCities.Houston, 12));
    this.destinationCardDeck.push(new DestinationCard(id++, USCities.Winnipeg, USCities.LittleRock, 11));
    this.destinationCardDeck.push(new DestinationCard(id++, USCities.Vancouver, USCities.Montreal, 20));
    this.shuffle(this.destinationCardDeck);
  }

  private dealTrainCards() {
    for (let i = 0; i < 4; i++) {
      for (const player of this.players) {
        const card = this.drawTrainCard();
        if (card) {
          player.trainCards.push(card);
        }
      }
    }

    for (let i = 0; i < 5; i++) {
      const card = this.drawTrainCard();
      this.faceUpTrainCards[i] = card;
    }

    this.dispatch('onFaceUpTrainCardsChange', new FaceUpTrainCardsChangeEventArgs(this.faceUpTrainCards));

    for (const player of this.players) {
      this.dispatch('onPlayerTrainCardsChange', new PlayerTrainCardsChangeEventArgs(player, player.trainCards));
    }
  }

  private dealDestinationCards() {
    for (let i = 0; i < 3; i++) {
      for (const player of this.players) {
        const card = this.drawDestinationCard();
        if (card) {
          player.destinationCards.push(card);
        }
      }
    }

    this.dispatch('onDestinationCardDeckChange', new DestinationCardDeckChangeEventArgs(this.destinationCardDeck));

    for (const player of this.players) {
      this.dispatch('onPlayerDestinationCardsChange', new PlayerDestinationCardsChangeEventArgs(player, player.destinationCards));
    }
  }

  private drawTrainCard() {
    if (this.trainCardDeck.length === 0 && this.discardedTrainCards.length > 0) {
      this.trainCardDeck.push(...this.discardedTrainCards);
      this.discardedTrainCards.length = 0;
      this.shuffle(this.trainCardDeck);
    }

    const card = this.trainCardDeck.pop();

    if (card) {
      this.dispatch('onTrainCardDeckChange', new TrainCardDeckChangeEventArgs(this.trainCardDeck));
      return card;
    } else {
      return null;
    }
  }

  private drawDestinationCard() {
    const card = this.destinationCardDeck.pop();
    this.dispatch('onDestinationCardDeckChange', new DestinationCardDeckChangeEventArgs(this.destinationCardDeck));
    return card;
  }

  private shuffle(array: Array<any>) {
    let currentIndex = array.length;

    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  }
}