import { Color } from "./Color";
import { RoutePosition } from "./RoutePosition";

export class Route {
  city1: string;
  city2: string;
  color: Color;
  positions: RoutePosition[];

  constructor(city1: string, city2: string, color: Color) {
    this.city1 = city1;
    this.city2 = city2;
    this.color = color;
    this.positions = [];
  }
}