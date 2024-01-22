import {
  crOptionsFromStr,
  fToKline
} from '../fToKline';

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

const toKline = fToKline({
  ...crOptionsFromStr(),
  o: 5,
  h: 3,
  l: 4,
  c: 2,
  v: 6
});

export default toKline
