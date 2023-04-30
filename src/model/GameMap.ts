import { City } from "./City";
import { Route } from "./Route";

export interface GameMap {
  readonly mapSource: string;
  readonly cities: City[];
  readonly routes: Route[];
}