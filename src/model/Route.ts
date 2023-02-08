import { Color } from "./Color";
import { RoutePosition } from "./RoutePosition";

export class Route {
  city1: string;
  city2: string;
  color: Color;
  carLength: number;
  positions: RoutePosition[];

  constructor(city1: string, city2: string, color: Color, carLength: number = 45) {
    this.city1 = city1;
    this.city2 = city2;
    this.color = color;
    this.carLength = carLength;
    this.positions = [];
  }
}