import { TrainCardColor } from "./TrainCardColor";

export class TrainCard {
  id: number;
  color: TrainCardColor;

  constructor(id: number, color: TrainCardColor) {
    this.id = id;
    this.color = color;
  }
}