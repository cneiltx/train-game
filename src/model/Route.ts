import { Player } from "./Player";
import { RouteSegment } from "./RouteSegment";
import { TrainCardColor } from "./TrainCardColor";
import { TrainColor } from "./TrainColor";
import { USCities } from "./USCities";

export class Route {
  readonly id: number;
  readonly city1: USCities;
  readonly city2: USCities;
  readonly color: TrainCardColor;
  readonly segmentLength: number;
  readonly segments: RouteSegment[] = [];
  train: TrainColor | null = null;
  available = true;
  unavailableFor: Player | null = null;

  constructor(id: number, city1: USCities, city2: USCities, color: TrainCardColor, segmentLength: number) {
    this.id = id;
    this.city1 = city1;
    this.city2 = city2;
    this.color = color;
    this.segmentLength = segmentLength;
  }
}