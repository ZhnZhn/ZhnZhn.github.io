import { roundByOHLC } from '../AdapterFn';

import fToKline from '../fToKline';

/*
From Gate.io Documentation
[[
  0: TS: string Unix timestamp in seconds
  1: VOLUME: string Quote currency trading volume
  2: CLOSE: string Close price
  3: HIGH: string Highest price
  4: LOW: string Lowest price
  5: OPEN: string Open price
  6: TURNOUT: string: Base currency trading amount
]]
*/

const _parseFloat = parseFloat;

const toKline = fToKline({
  o: 5,
  h: 3,
  l: 4,
  c: 2,
  v: 1,
  crDate: (v) => _parseFloat(v)*1000,
  crValue: (v) => roundByOHLC(_parseFloat(v)),
  crVolume: (v) => _parseFloat(v)
});

export default toKline
