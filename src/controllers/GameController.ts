import { Player } from "../model/Player";
import { DestinationCard } from "../model/DestinationCard";
import { TrainCard } from "../model/TrainCard";
import { USCities } from "../model/USCities";
import { GameStatus } from "../model/GameStatus";
import { TrainCardColor } from "../model/TrainCardColor";
import { EnumFunctions } from "../model/EnumFunctions";
import { USMap } from "../model/GameMap";

/*
 * Raises events onStatusChange, onActivePlayerChange, onPlayerJoin, onFaceUpTrainCardsChange, onActivePlayerTrainCardsChange, onTrainCardDeckChange
 */
export class GameController extends EventTarget {
  readonly gameID: string;
  readonly players: Player[] = [];
  readonly localPlayer: Player;
  readonly trainCardDeck: TrainCard[] = [];
  readonly faceUpTrainCards: (TrainCard | null)[] = [];
  readonly discardedTrainCards: TrainCard[] = [];
  readonly destinationCardDeck: DestinationCard[] = [];
  readonly map: USMap;
  private _status = GameStatus.Initializing;
  private _activePlayer: Player;

  constructor(gameID: string, localPlayer: Player) {
    super();
    this.gameID = gameID;
    this.localPlayer = localPlayer;
    this.players.push(localPlayer);
    this.map = new USMap();
    this._activePlayer = localPlayer;
  }

  get status() {
    return this._status;
  }

  private set status(status: GameStatus) {
    if (this.status !== status) {
      this._status = status;
      this.dispatchEvent(new CustomEvent('onStatusChange', { detail: { status: status } }));
    }
  }

  get activePlayer() {
    return this._activePlayer;
  }

  private set activePlayer(player: Player) {
    if (this.activePlayer.name !== player.name) {
      this._activePlayer = player;
      this.dispatchEvent(new CustomEvent('onActivePlayerChange', { detail: { player: player } }));
    }
  }

  join(player: Player) {
    if (this.status !== GameStatus.Initializing) {
      throw new Error('You cannot join because this game it is not in Initializing status.');
    } else if (this.players.find((item) => item.name.toLowerCase() === player.name.toLowerCase())) {
      throw new Error(`A player named ${player.name} already exists in this game. Please use a different name.`);
    } else {
      this.players.push(player);
      this.dispatchEvent(new CustomEvent('onPlayerJoin', { detail: { player: player } }));
    }
  }

  startGame() {
    if (this.status !== GameStatus.Initializing) {
      throw new Error('This game cannot be started because it is not in Initializing status.');
    } else {
      this.status = GameStatus.Playing;
      this.initializeTrainCards();
      this.initializeDestinationCards();
      this.dealTrainCards();
      this.dealDestinationCards();
    }
  }

  drawTrainCardFromDeck() {
    const card = this.drawTrainCard();

    if (card) {
      this.activePlayer.trainCards.push(card);
    }

    return card;
  }

  drawFaceUpTrainCard(card: TrainCard) {
    const index = this.faceUpTrainCards.findIndex((item) => card.id === item?.id);

    if (index >= 0) {
      this.activePlayer.trainCards.push(card);
      const newCard = this.drawTrainCard();
      this.faceUpTrainCards[index] = newCard;
      this.dispatchEvent(new CustomEvent('onFaceUpTrainCardsChange', { detail: { cards: this.faceUpTrainCards } }));
      this.dispatchEvent(new CustomEvent('onActivePlayerTrainCardsChange', { detail: { cards: this.activePlayer.trainCards } }));
      return card;
    } else {
      return undefined;
    }
  }

  private initializeTrainCards() {
    let id = 0;
    for (const color of EnumFunctions.getEnumValues<TrainCardColor>(TrainCardColor)) {
      for (let i = 0; i < 12; i++) {
        this.trainCardDeck.push(new TrainCard(id++, color));
      }
    }

    this.trainCardDeck.push(new TrainCard(id++, TrainCardColor.Rainbow));
    this.trainCardDeck.push(new TrainCard(id++, TrainCardColor.Rainbow));
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
      if (card) {
        this.faceUpTrainCards.push(card);
      }
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
  }

  private drawTrainCard() {
    if (this.trainCardDeck.length === 0 && this.discardedTrainCards.length > 0) {
      this.trainCardDeck.push(...this.discardedTrainCards);
      this.discardedTrainCards.length = 0;
      this.shuffle(this.trainCardDeck);
    }

    const card = this.trainCardDeck.pop();

    if (card) {
      this.dispatchEvent(new CustomEvent('onTrainCardDeckChange', { detail: { cards: this.trainCardDeck } }));
      return card;
    } else {
      return null;
    }
  }

  private drawDestinationCard() {
    return this.destinationCardDeck.pop();
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