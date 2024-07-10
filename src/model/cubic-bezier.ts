/// Store cubic bezier data
export class CubicBezier {
  x1!: number;
  y1!: number;
  x2!: number;
  y2!: number;

  constructor(x1: number, y1: number, x2: number, y2: number) {
    this.setValues(x1, y1, x2, y2);
  }

  /// Set values, ensuring that x is between [0, 1]
  setValues(x1: number, y1: number, x2: number, y2: number): void {
    this.x1 = x1 >= 0 ? (x1 <= 1 ? x1 : 1) : 0;
    this.y1 = y1;
    this.x2 = x2 >= 0 ? (x2 <= 1 ? x2 : 1) : 0;
    this.y2 = y2;
  }

  /// Equality checker
  equals(other: CubicBezier): boolean {
    return this.x1 === other.x1 && this.y1 === other.y1
        && this.x2 === other.x2 && this.y2 === other.y2;
  }

  /// Checks if the bezier is close enough to linear
  isLinear(error: number = 0.01): boolean {
    return Math.abs(this.x1 - this.x2) < error
        && Math.abs(this.y1 - this.y2) < error;
  }
}