import { RouteColor } from "./RouteColor";
import { RouteSegment } from "./RouteSegment";
import { TrainColor } from "./TrainColor";

export class Route {
  city1: string;
  city2: string;
  color: RouteColor;
  carLength: number;
  segments: RouteSegment[];
  train: TrainColor | null = null;

  constructor(city1: string, city2: string, color: RouteColor, carLength: number) {
    this.city1 = city1;
    this.city2 = city2;
    this.color = color;
    this.carLength = carLength;
    this.segments = [];
  }
}