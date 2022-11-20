export const createArrayOfNumbers = (
  start = 0,
  end = 10,
  step = 1,
): number[] => {
  const res = [];
  for (let i = start; i < end; i += step) {
    res.push(i);
  }
  return res;
};
