/**
 * Generates an array of numbers within a specified range and step size.
 *
 * This function creates an array of numbers starting from `start`,
 * incrementing by `step` until reaching `stop` (exclusive). Only
 * incremental ranges are supported (positive steps).
 *
 * @param start The starting number of the range (inclusive).
 * @param stop The ending number of the range (exclusive).
 * @param step The increment between each number in the range.
 * @param decimalPrecision Optional value to ensure precision of float
 *  output, initially set to 7 decimal points
 * @returns A number[] from start to stop (exclusive) with the specified step.
 */
const range = (
  start: number,
  stop: number,
  step: number,
  decimalPrecision = 7
): number[] => {
  const result = new Array<number>();
  for (let i = start; i < stop; i += step) {
    result.push(i);
  }

  // Use precision for floating point operations
  if (
    Number.isInteger(start) &&
    Number.isInteger(stop) &&
    Number.isInteger(step)
  ) {
    return result;
  }
  const roundingMultiplier = Math.pow(10, decimalPrecision);
  return result.map(
    (val) => Math.round(val * roundingMultiplier) / roundingMultiplier
  );
};

export default range;
