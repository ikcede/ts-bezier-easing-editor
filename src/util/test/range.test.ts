import { range } from '../';

describe('range', () => {
  it('produces a range', () => {
    expect(range(0, 5, 1)).toEqual([0, 1, 2, 3, 4]);
  });

  it('works with floats', () => {
    expect(range(0, 1, 0.25)).toEqual([0, 0.25, 0.5, 0.75]);
  });
});
