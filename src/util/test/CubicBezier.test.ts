import CubicBezier from '../CubicBezier';

describe('CubicBezier', () => {
  describe('constructor', () => {
    test('creates a CubicBezier with valid values', () => {
      const bezier = new CubicBezier(0.25, 0.1, 0.25, 1);
      expect(bezier.x1).toBe(0.25);
      expect(bezier.y1).toBe(0.1);
      expect(bezier.x2).toBe(0.25);
      expect(bezier.y2).toBe(1);
    });

    test('constrains x values to [0, 1]', () => {
      const bezier = new CubicBezier(-0.5, 0.1, 1.5, 1);
      expect(bezier.x1).toBe(0);
      expect(bezier.x2).toBe(1);
    });
  });

  describe('fromArray', () => {
    test('creates a CubicBezier from an array of numbers', () => {
      const bezier = CubicBezier.fromArray([0.25, 0.1, 0.25, 1]);
      expect(bezier.x1).toBe(0.25);
      expect(bezier.y1).toBe(0.1);
      expect(bezier.x2).toBe(0.25);
      expect(bezier.y2).toBe(1);
    });
  });

  describe('fromStringArray', () => {
    test('creates a CubicBezier from an array of valid strings', () => {
      const bezier = CubicBezier.fromStringArray([
        '0.25',
        '0.1',
        '0.25',
        '1',
      ]);
      expect(bezier?.x1).toBe(0.25);
      expect(bezier?.y1).toBe(0.1);
      expect(bezier?.x2).toBe(0.25);
      expect(bezier?.y2).toBe(1);
    });

    test('returns null for invalid string inputs', () => {
      const bezier = CubicBezier.fromStringArray([
        '0.25',
        'invalid',
        '0.25',
        '1',
      ]);
      expect(bezier).toBeNull();
    });
  });

  describe('setValues', () => {
    test('updates values and constrains x to [0, 1]', () => {
      const bezier = new CubicBezier(0, 0, 0, 0);
      bezier.setValues(-0.5, 0.1, 1.5, 1);
      expect(bezier.x1).toBe(0);
      expect(bezier.y1).toBe(0.1);
      expect(bezier.x2).toBe(1);
      expect(bezier.y2).toBe(1);
    });
  });

  describe('equals', () => {
    test('returns true for equal CubicBeziers', () => {
      const bezier1 = new CubicBezier(0.25, 0.1, 0.25, 1);
      const bezier2 = new CubicBezier(0.25, 0.1, 0.25, 1);
      expect(bezier1.equals(bezier2)).toBe(true);
    });

    test('returns false for different CubicBeziers', () => {
      const bezier1 = new CubicBezier(0.25, 0.1, 0.25, 1);
      const bezier2 = new CubicBezier(0.3, 0.1, 0.25, 1);
      expect(bezier1.equals(bezier2)).toBe(false);
    });
  });

  describe('isLinear', () => {
    test('returns true for approximately linear curves', () => {
      const bezier = new CubicBezier(0.25, 0.25, 0.75, 0.75);
      expect(bezier.isLinear()).toBe(true);
    });

    test('returns false for non-linear curves', () => {
      const bezier = new CubicBezier(0.25, 0.1, 0.25, 1);
      expect(bezier.isLinear()).toBe(false);
    });

    test('respects custom error value', () => {
      const bezier = new CubicBezier(0.25, 0.26, 0.75, 0.74);
      expect(bezier.isLinear(0.1)).toBe(true);
      expect(bezier.isLinear(0.01)).toBe(false);
    });
  });

  describe('toArray', () => {
    test('converts CubicBezier to array', () => {
      const bezier = new CubicBezier(0.25, 0.1, 0.25, 1);
      expect(bezier.toArray()).toEqual([0.25, 0.1, 0.25, 1]);
    });
  });

  describe('toStringArray', () => {
    test('converts CubicBezier to string array', () => {
      const bezier = new CubicBezier(0.25, 0.1, 0.25, 1);
      expect(bezier.toStringArray()).toEqual(['0.25', '0.1', '0.25', '1']);
    });
  });
});
