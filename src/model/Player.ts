import { DestinationCard } from "./DestinationCard";
import { PlayerState } from "./PlayerState";
import { TrainCard } from "./TrainCard";
import { TrainColor } from "./TrainColor";

export class Player {
  readonly name: string;
  readonly avatarImageSrc: string;
  readonly color: TrainColor;
  trainCards: TrainCard[] = [];
  destinationCards: DestinationCard[] = [];
  state = PlayerState.NotActive;
  score = 0;
  trains = 45;

  constructor(name: string, avatarImageSrc: string, color: TrainColor) {
    this.name = name;
    this.avatarImageSrc = avatarImageSrc;
    this.color = color;
  }
}