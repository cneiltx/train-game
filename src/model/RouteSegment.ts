export class RouteSegment {
  readonly x: number;
  readonly y: number;
  readonly angle: number;

  constructor(x: number, y: number, angle: number) {
    this.x = x;
    this.y = y;
    this.angle = angle;
  }
}