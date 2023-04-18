import { USCities } from "./USCities";

export class USCity {
  readonly city: USCities;
  readonly mapX: number;
  readonly mapY: number;
  readonly cardX: number;
  readonly cardY: number;
  readonly printName: string;
  readonly printXOffset: number;
  readonly printYOffset: number;
  readonly printAlign: 'left' | 'right' | 'center';

  constructor(city: USCities, mapX: number, mapY: number, cardX: number, cardY: number, printName: string, printXOffset: number, printYOffset: number, printAlign: 'left' | 'right' | 'center') {
    this.city = city;
    this.mapX = mapX;
    this.mapY = mapY;
    this.cardX = cardX;
    this.cardY = cardY;
    this.printName = printName;
    this.printXOffset = printXOffset;
    this.printYOffset = printYOffset;
    this.printAlign = printAlign;
  }
}