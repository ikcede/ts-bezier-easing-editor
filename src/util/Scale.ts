/// Scales values from one range to another
class Scale {
  initialRangeStart: number;
  initialRangeEnd: number;
  scaledRangeStart: number;
  scaledRangeEnd: number;

  constructor(
    initialRangeStart: number,
    initialRangeEnd: number,
    scaledRangeStart: number,
    scaledRangeEnd: number
  ) {
    this.initialRangeStart = initialRangeStart;
    this.initialRangeEnd = initialRangeEnd;
    this.scaledRangeStart = scaledRangeStart;
    this.scaledRangeEnd = scaledRangeEnd;
  }

  /// Scales the value from an initial range to a scaled range
  scale(value: number): number {
    return (
      ((value - this.initialRangeStart) /
        (this.initialRangeEnd - this.initialRangeStart)) *
        (this.scaledRangeEnd - this.scaledRangeStart) +
      this.scaledRangeStart
    );
  }

  /// Scales from the scaled range to the initial range
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
