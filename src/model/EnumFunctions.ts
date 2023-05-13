import { TrainCardColor } from "./TrainCardColor";
import { TrainColor } from "./TrainColor";

export class EnumFunctions {
  static getEnumValues<T extends object>(enumType: T) {
    return Object.values(enumType).filter((value) => !isNaN(Number(value)));
  }

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

  static getName(color: TrainCardColor) {
    switch (color) {
      case TrainCardColor.Black:
        return 'black';
      case TrainCardColor.Blue:
        return 'blue';
      case TrainCardColor.Green:
        return 'green';
      case TrainCardColor.Orange:
        return 'orange';
      case TrainCardColor.Purple:
        return 'purple';
      case TrainCardColor.Wild:
        return 'rainbow';
      case TrainCardColor.Red:
        return 'red';
      case TrainCardColor.White:
        return 'white';
      case TrainCardColor.Yellow:
        return 'yellow';
    }
  }
}