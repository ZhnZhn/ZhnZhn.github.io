import { rsi } from '../rsi';

describe('RSI',()=>{
  const fn = rsi;
  test('should return RSI seria by data and period',()=>{
    const CLOSE_PRICES = [
      [1, 67.24],
      [2, 69.06],
      [3, 70.8],
      [4, 71],
      [5, 71.59],
      [6, 70.53],
      [7, 67.71],
      [8, 70.07],
      [9, 76.53],
      [10, 74.7],

      [11, 74.91],
      [12, 75.16],
      [13, 75.4],
      [14, 72.45],
      [15, 75.15],
      [16, 84.64],
      [17, 88.31],
      [18, 86.09],
      [19, 83.68],
      [20, 85.91],

      [21, 84.69]
    ]
    , _getRecentRsiValue = (
        closePrices,
        period
      ) => {
        const _rsi = fn(closePrices, period)
        return _rsi[_rsi.length-1][1];
    };

    expect(_getRecentRsiValue(CLOSE_PRICES, 9)).toBe(66.58)
    expect(_getRecentRsiValue(CLOSE_PRICES, 14)).toBe(67.26)
    expect(_getRecentRsiValue(CLOSE_PRICES, 20)).toBe(67.91)
  })
})
