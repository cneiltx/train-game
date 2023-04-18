import { TrainCardColor } from "./TrainCardColor";

export class TrainCard {
  readonly id: number;
  readonly color: TrainCardColor;

  constructor(id: number, color: TrainCardColor) {
    this.id = id;
    this.color = color;
  }
}