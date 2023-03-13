import { RouteColor } from "./RouteColor";
import { RouteSegment } from "./RouteSegment";
import { TrainColor } from "./TrainColor";
import { USCities } from "./USCities";

export class Route {
  city1: USCities;
  city2: USCities;
  color: RouteColor;
  segmentLength: number;
  segments: RouteSegment[];
  train: TrainColor | null = null;

  constructor(city1: USCities, city2: USCities, color: RouteColor, segmentLength: number) {
    this.city1 = city1;
    this.city2 = city2;
    this.color = color;
    this.segmentLength = segmentLength;
    this.segments = [];
  }
}