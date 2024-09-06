/**
 * Represents a scaling operation between two numeric ranges.
 *
 * This class allows for scaling values from an initial range to a
 * scaled range, and vice versa, using linear scaling and
 * extrapolation for values outside of the provided ranges.
 */
class Scale {
  /**
   * @param initialRangeStart The start of the initial range
   * @param initialRangeEnd The end of the initial range
   * @param scaledRangeStart The start of the scaled range
   * @param scaledRangeEnd The end of the scaled range
   */
  constructor(
    public initialRangeStart: number,
    public initialRangeEnd: number,
    public scaledRangeStart: number,
    public scaledRangeEnd: number
  ) {}

  /**
   * Scales a value from the initial range to the scaled range.
   *
   * @param value The value to scale, can be outside the initial range
   * @returns The scaled value within the scaled range
   */
  scale(value: number): number {
    return (
      ((value - this.initialRangeStart) /
        (this.initialRangeEnd - this.initialRangeStart)) *
        (this.scaledRangeEnd - this.scaledRangeStart) +
      this.scaledRangeStart
    );
  }

  /**
   * Scales a value from the scaled range back to the initial range.
   *
   * @param value The value to scale, can be outside the scaled range
   * @returns The scaled value within the initial range
   */
  inverse(value: number): number {
    return (
      ((value - this.scaledRangeStart) /
        (this.scaledRangeEnd - this.scaledRangeStart)) *
        (this.initialRangeEnd - this.initialRangeStart) +
      this.initialRangeStart
    );
  }
}

export default Scale;
