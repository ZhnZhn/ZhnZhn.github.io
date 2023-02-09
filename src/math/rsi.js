import {
  crDataArrays,
  mergeToChartPoints
} from './seriaHelperFn';

import { pointwise } from './pointwise';
import { ema } from './ema';

const _rsi = (
  closePrices,
  window
) => {
  let gains = [0]
  , loss = [1e-14]
  , _len = closePrices.length
  , i;
  for (i = 1; i < _len; i++) {
    let diff = closePrices[i] - closePrices[i-1];
    gains.push(diff >= 0 ? diff : 0);
    loss.push(diff < 0 ? -diff : 0);
  }
  return pointwise(
    (a, b) => 100 - 100/(1 + a/b),
    ema(gains, 2 * window - 1),
    ema(loss, 2 * window - 1)
  );
}

export const rsi = (
  data,
  period
) => {
  const [
    _dataToRsi,
    _dataToX
  ] = crDataArrays(data);
  return mergeToChartPoints(
    _dataToX.slice(period),
    _rsi(_dataToRsi, period).slice(period)
  );
}
