import {
  crOptionsFromStr,
  fToKline
} from '../fToKline';

/*
From Bybit Documentation
[[
  0: TS: string Unix timestamp in milisecond
  1: OPEN: string Open price
  2: HIGH: string Highest price
  3: LOW: string Lowest price
  4: CLOSE: string Close price
  5: VOLUME: string Quote currency trading volume
  6: TURNOUT: string: Base currency trading amount
]]
*/

const toKline = fToKline({
  ...crOptionsFromStr(false),
  h:2,
  l:3,
  c:4
});

export default toKline
