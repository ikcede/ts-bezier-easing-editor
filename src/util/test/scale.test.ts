import Scale from '../Scale';

describe('Scale', () => {
  let scale: Scale;

  beforeEach(() => {
    scale = new Scale(0, 100, 0, 1);
  });

  test('constructor initializes properties correctly', () => {
    expect(scale.initialRangeStart).toBe(0);
    expect(scale.initialRangeEnd).toBe(100);
    expect(scale.scaledRangeStart).toBe(0);
    expect(scale.scaledRangeEnd).toBe(1);
  });

  test('scale method scales values correctly', () => {
    expect(scale.scale(0)).toBe(0);
    expect(scale.scale(50)).toBe(0.5);
    expect(scale.scale(100)).toBe(1);
  });

  test('inverse method scales values correctly', () => {
    expect(scale.inverse(0)).toBe(0);
    expect(scale.inverse(0.5)).toBe(50);
    expect(scale.inverse(1)).toBe(100);
  });

  test('scale and inverse are reciprocal', () => {
    const value = 75;
    expect(scale.inverse(scale.scale(value))).toBeCloseTo(value);
  });

  test('scale handles negative ranges', () => {
    const negativeScale = new Scale(-100, 100, -1, 1);
    expect(negativeScale.scale(-100)).toBe(-1);
    expect(negativeScale.scale(0)).toBe(0);
    expect(negativeScale.scale(100)).toBe(1);
  });

  test('scale handles reversed ranges', () => {
    const reversedScale = new Scale(100, 0, 0, 1);
    expect(reversedScale.scale(100)).toBe(0);
    expect(reversedScale.scale(50)).toBe(0.5);
    expect(reversedScale.scale(0)).toBe(1);
  });

  test('scale handles input below initial range', () => {
    expect(scale.scale(-50)).toBe(-0.5);
  });

  test('scale handles input above initial range', () => {
    expect(scale.scale(150)).toBe(1.5);
  });

  test('inverse handles input below scaled range', () => {
    expect(scale.inverse(-0.5)).toBe(-50);
  });

  test('inverse handles input above scaled range', () => {
    expect(scale.inverse(1.5)).toBe(150);
  });

  test('scale and inverse handle extremely large values', () => {
    const largeValue = 1e10;
    expect(scale.scale(largeValue)).toBe(1e8);
    expect(scale.inverse(largeValue)).toBe(1e12);
  });
});
