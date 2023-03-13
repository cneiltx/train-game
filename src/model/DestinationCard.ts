import { USCities } from "./USCities";

export class DestinationCard {
  city1: USCities;
  city2: USCities;
  points: number;

  constructor(city1: USCities, city2: USCities, points: number) {
    this.city1 = city1;
    this.city2 = city2;
    this.points = points;
  }
}