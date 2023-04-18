import { RouteColor } from "./RouteColor";
import { RouteSegment } from "./RouteSegment";
import { TrainColor } from "./TrainColor";
import { USCities } from "./USCities";

export class Route {
  readonly id: number;
  readonly city1: USCities;
  readonly city2: USCities;
  readonly color: RouteColor;
  readonly segmentLength: number;
  readonly segments: RouteSegment[] = [];
  train: TrainColor | null = null;

  constructor(id: number, city1: USCities, city2: USCities, color: RouteColor, segmentLength: number) {
    this.id = id;
    this.city1 = city1;
    this.city2 = city2;
    this.color = color;
    this.segmentLength = segmentLength;
  }
}