/**
 * Represents a cubic Bezier curve defined by four control points.
 *
 * This class stores and manipulates the data for a cubic Bezier curve,
 * which is defined by two endpoints and two control points. The x-coordinates
 * of the control points are constrained to the range [0, 1].
 */
export default class CubicBezier {
  x1!: number;
  y1!: number;
  x2!: number;
  y2!: number;

  /**
   * Creates a new CubicBezier instance.
   *
   * @param x1 First point's x-coordinate constrained to [0, 1]
   * @param y1 First point's y-coordinate
   * @param x2 Second point's x-coordinate constrained to [0, 1]
   * @param y2 Second point's y-coordinate
   */
  constructor(x1: number, y1: number, x2: number, y2: number) {
    this.setValues(x1, y1, x2, y2);
  }

  /**
   * Creates a CubicBezier instance from an array of numbers
   *
   * @param arr number[] representing [x1, y1, x2, y2]
   * @returns A new CubicBezier instance
   */
  static fromArray(arr: number[]): CubicBezier {
    return new CubicBezier(arr[0], arr[1], arr[2], arr[3]);
  }

  /**
   * Creates a CubicBezier instance from an array of strings.
   *
   * @param arr string[] representing [x1, y1, x2, y2].
   * @returns CubicBezier or null if strings cannot be parsed
   */
  static fromStringArray(arr: string[]): CubicBezier | null {
    let nums = arr.map(parseFloat);
    if (Number.isNaN(nums[0] + nums[1] + nums[2] + nums[3])) return null;
    return CubicBezier.fromArray(nums);
  }

  /**
   * Sets the values of the control points, ensuring x-coordinates
   * are within [0, 1].
   *
   * @param x1 The x-coordinate of the first control point.
   * @param y1 The y-coordinate of the first control point.
   * @param x2 The x-coordinate of the second control point.
   * @param y2 The y-coordinate of the second control point.
   */
  setValues(x1: number, y1: number, x2: number, y2: number): void {
    this.x1 = x1 >= 0 ? (x1 <= 1 ? x1 : 1) : 0;
    this.y1 = y1;
    this.x2 = x2 >= 0 ? (x2 <= 1 ? x2 : 1) : 0;
    this.y2 = y2;
  }

  /**
   * Checks if this CubicBezier is equal to another.
   *
   * @param other Another CubicBezier instance to compare with.
   * @returns True if all control points are equal, false otherwise.
   */
  equals(other: CubicBezier): boolean {
    return (
      this.x1 === other.x1 &&
      this.y1 === other.y1 &&
      this.x2 === other.x2 &&
      this.y2 === other.y2
    );
  }

  /**
   * Checks if the Bezier curve is approximately linear.
   *
   * @param error The maximum allowed difference between control
   * points to consider the curve linear. Default is 0.01.
   * @returns True if the curve is approximately linear, false otherwise.
   */
  isLinear(error: number = 0.01): boolean {
    return (
      Math.abs(this.x1 - this.y1) <= error &&
      Math.abs(this.x2 - this.y2) <= error
    );
  }

  /**
   * Converts the CubicBezier instance to an array of numbers.
   *
   * @returns An array of four numbers representing [x1, y1, x2, y2].
   */
  toArray(): [number, number, number, number] {
    return [this.x1, this.y1, this.x2, this.y2];
  }

  /**
   * Converts the CubicBezier instance to an array of strings.
   *
   * @returns An array of four strings representing [x1, y1, x2, y2].
   */
  toStringArray(): [string, string, string, string] {
    return [
      this.x1.toString(),
      this.y1.toString(),
      this.x2.toString(),
      this.y2.toString(),
    ];
  }
}
