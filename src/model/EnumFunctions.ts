export class EnumFunctions {
  static getEnumValues<T>(enumType: object) {
    return Object.values(enumType).filter(value => !isNaN(Number(value))) as T[];
  }
}