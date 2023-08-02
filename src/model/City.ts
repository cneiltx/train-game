import { Cities } from "./Cities";

export class City {
  readonly city: Cities;
  readonly mapX: number;
  readonly mapY: number;
  readonly cardX: number;
  readonly cardY: number;
  readonly mapName: string;
  readonly printXOffset: number;
  readonly printYOffset: number;
  readonly printAlign: "left" | "right" | "center";

  constructor(city: Cities, mapX: number, mapY: number, cardX: number, cardY: number, printName: string, printXOffset: number, printYOffset: number, printAlign: "left" | "right" | "center") {
    this.city = city;
    this.mapX = mapX;
    this.mapY = mapY;
    this.cardX = cardX;
    this.cardY = cardY;
    this.mapName = printName;
    this.printXOffset = printXOffset;
    this.printYOffset = printYOffset;
    this.printAlign = printAlign;
  }

  get name() {
    return this.mapName.replaceAll("\n", " ");
  }
}