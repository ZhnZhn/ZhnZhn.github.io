import { pointwise } from './pointwise';
import { ema } from './ema';

//export function rsi($close: Array<number>, window: number) {
export const rsi = (
  $close,
  window
) => {
  let gains = [0], loss = [1e-14];
  for (let i = 1, len = $close.length; i < len; i++) {
    let diff = $close[i] - $close[i - 1];
    gains.push(diff >= 0 ? diff : 0);
    loss.push(diff < 0 ? -diff : 0);
  }
  return pointwise((a, b) => 100 - 100 / (1 + a / b), ema(gains, 2 * window - 1), ema(loss, 2 * window - 1));
}
