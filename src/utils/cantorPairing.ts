const SECRET_NUMBER = 1000000;
export const pair = (n: number, m: number) => {
  return (((n + m) * (n + m + 1)) / 2 + m) * SECRET_NUMBER;
};

export const unpair = (z: number) => {
  z = z / SECRET_NUMBER;
  const w = Math.floor((Math.sqrt(8 * z + 1) - 1) / 2);
  const t = (w * w + w) / 2;
  const m = z - t;
  const n = w - m;
  return [n, m];
};
