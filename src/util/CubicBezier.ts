/// Store cubic bezier data
export default class CubicBezier {
  x1!: number;
  y1!: number;
  x2!: number;
  y2!: number;

  constructor(x1: number, y1: number, x2: number, y2: number) {
    this.setValues(x1, y1, x2, y2);
  }

  /// Helper to build a CubicBezier from an array
  static fromArray(arr: number[]): CubicBezier {
    return new CubicBezier(arr[0], arr[1], arr[2], arr[3]);
  }

  /// Helper to build a CubicBezier from an array of strings
  static fromStringArray(arr: string[]): CubicBezier | null {
    let nums = arr.map(parseFloat);
    if (Number.isNaN(nums[0] + nums[1] + nums[2] + nums[3])) return null;
    return CubicBezier.fromArray(nums);
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
    return (
      this.x1 === other.x1 &&
      this.y1 === other.y1 &&
      this.x2 === other.x2 &&
      this.y2 === other.y2
    );
  }

  /// Checks if the bezier is close enough to linear
  isLinear(error: number = 0.01): boolean {
    return (
      Math.abs(this.x1 - this.x2) < error &&
      Math.abs(this.y1 - this.y2) < error
    );
  }

  /// Converts CubicBezier into an array
  toArray(): [number, number, number, number] {
    return [this.x1, this.y1, this.x2, this.y2];
  }

  /// Converts CubicBezier to a string array
  toStringArray(): [string, string, string, string] {
    return [
      this.x1.toString(),
      this.y1.toString(),
      this.x2.toString(),
      this.y2.toString(),
    ];
  }
}
