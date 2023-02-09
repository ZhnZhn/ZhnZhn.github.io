import { avg } from './avg';

export const ema = (
  series,
  window,
  start
) => {
  let weight = 2/(window + 1)
  , ema = [start || avg(series.slice(0, window))]
  , _len = series.length
  , i;
  for (i = 1; i < _len; i++) {
    ema.push(series[i] * weight + (1 - weight) * ema[i-1]);
  }
  return ema;
}
