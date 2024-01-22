import { fToKline } from '../fToKline';

/*
From Coinbase Documentation
[[
 S: number time bucket start time in second
 LOW: number lowest price during the bucket interval
 HIGHT: number highest price during the bucket interval
 OPEN: number opening price (first trade) in the bucket interval
 CLOSE: number closing price (last trade) in the bucket interval
 Volume: number volume of trading activity during the bucket interval
]]
*/


const toKline = fToKline({
  o: 3,
  h: 2,
  l: 1,
  c: 4,
  crDate: (v) => v*1000
});

export default toKline
