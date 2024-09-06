import { range } from '../';

describe('range function', () => {
  test('generates a range with positive integer step', () => {
    expect(range(0, 5, 1)).toEqual([0, 1, 2, 3, 4]);
  });

  test('generates a range with larger positive integer step', () => {
    expect(range(1, 10, 2)).toEqual([1, 3, 5, 7, 9]);
  });

  test('generates a range with positive non-integer step', () => {
    expect(range(0, 1, 0.2)).toEqual([0, 0.2, 0.4, 0.6, 0.8]);
  });

  test('generates an empty array when start >= stop', () => {
    expect(range(5, 0, 1)).toEqual([]);
    expect(range(5, 5, 1)).toEqual([]);
  });

  test('generates a range with a single element', () => {
    expect(range(0, 1, 1)).toEqual([0]);
  });

  test('handles decimal start and stops', () => {
    expect(range(1.1, 5.1, 1)).toEqual([1.1, 2.1, 3.1, 4.1]);
  });

  test('handles negative start values', () => {
    expect(range(-5, 0, 1)).toEqual([-5, -4, -3, -2, -1]);
  });

  test('handles negative start and stop values', () => {
    expect(range(-5, -1, 1)).toEqual([-5, -4, -3, -2]);
  });

  test('handles zero as start value', () => {
    expect(range(0, 3, 1)).toEqual([0, 1, 2]);
  });
});
