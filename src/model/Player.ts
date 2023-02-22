import { DestinationCard } from "./DestinationCard";
import { TrainCard } from "./TrainCard";
import { TrainColor } from "./TrainColor";

export class Player {
  name: string;
  color: TrainColor;
  avatarImageSrc: string;
  points = 0;
  trains = 45;
  trainCards: TrainCard[] = [];
  destinationCards: DestinationCard[] = [];

  constructor(name: string, color: TrainColor, avatarImageSrc: string) {
    this.name = name;
    this.color = color;
    this.avatarImageSrc = avatarImageSrc;
  }
}