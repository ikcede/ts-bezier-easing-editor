/// Generate an array of numbers by step size
const range = (start: number, stop: number, step: number): number[] => {
  const o = new Array<number>();
  for (let i = start; i < stop; i += step) {
    o.push(i);
  }
  return o;
};

export default range;
