import { TrainColor } from "./TrainColor";

export class ColorFunctions {
  static getHtmlColor(color: TrainColor) {
    switch (color) {
      case TrainColor.Black:
        return 'black';
      case TrainColor.Blue:
        return 'darkblue';
      case TrainColor.Green:
        return 'darkgreen';
      case TrainColor.Red:
        return 'firebrick';
      case TrainColor.Yellow:
        return 'goldenrod';
    }
  }
}