import { avg } from './avg';

//export function ema(series: Array<number>, window: number, start ?: number) {
export const ema = (
  series,
  window,
  start
) => {
  let weight = 2 / (window + 1);
  let ema = [ start ? start : avg(series.slice(0, window)) ];
  for (let i = 1, len = series.length; i < len; i++) {
    ema.push(series[i] * weight + (1 - weight) * ema[i - 1]);
  }
  return ema;
}
