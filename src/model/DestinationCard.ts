import { USCities } from "./USCities";

export class DestinationCard {
  id: number;
  city1: USCities;
  city2: USCities;
  points: number;
  complete: boolean;

  constructor(id: number, city1: USCities, city2: USCities, points: number, complete: boolean = false) {
    this.id = id;
    this.city1 = city1;
    this.city2 = city2;
    this.points = points;
    this.complete = complete;
  }
}