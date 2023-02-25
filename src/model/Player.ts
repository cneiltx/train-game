import { DestinationCard } from "./DestinationCard";
import { TrainCard } from "./TrainCard";
import { TrainColor } from "./TrainColor";

export class Player {
  name: string;
  color: TrainColor | undefined;
  avatarImageSrc: string;
  points = 0;
  trains = 45;
  trainCards: TrainCard[] = [];
  destinationCards: DestinationCard[] = [];

  constructor(name: string, avatarImageSrc: string) {
    this.name = name;
    this.avatarImageSrc = avatarImageSrc;
  }
}