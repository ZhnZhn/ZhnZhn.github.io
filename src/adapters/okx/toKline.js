import { roundByOHLC } from '../AdapterFn';
import { fToKline } from '../fToKline';

/*
From OKX Documentation
[[
 S: string time bucket start time in miliseconds
 OPEN: string lowest price during the bucket interval
 HIGHT: string highest price during the bucket interval
 LOW: string opening price (first trade) in the bucket interval
 CLOSE: string closing price (last trade) in the bucket interval
 CONFIRM: string volume of trading activity during the bucket interval
]]
*/

const _parseFloat = parseFloat;

const toKline = fToKline({
  isNotVolume: true,
  h:2,
  l:3,
  c:4,
  crDate: (v) => _parseFloat(v),
  crValue: (v) => roundByOHLC(parseFloat(v)),
});

export default toKline
