import Big from 'big.js';

export const avg = (
  series
) => {
  const _len = series.length;
  return _len
   ? parseFloat(series
      .reduce((bResult, value) => bResult.add(value), Big(0))
      .div(_len)
      .toFixed()
      )
   : NaN;
}
