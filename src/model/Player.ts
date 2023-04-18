import { DestinationCard } from "./DestinationCard";
import { TrainCard } from "./TrainCard";
import { TrainColor } from "./TrainColor";

export class Player {
  readonly name: string;
  readonly avatarImageSrc: string;
  readonly trainCards: TrainCard[] = [];
  readonly destinationCards: DestinationCard[] = [];
  color: TrainColor = TrainColor.Red;
  points = 0;
  trains = 45;

  constructor(name: string, avatarImageSrc: string) {
    this.name = name;
    this.avatarImageSrc = avatarImageSrc;
  }
}