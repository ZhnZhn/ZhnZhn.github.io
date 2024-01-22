import {
  crOptionsFromStr,
  fToKline
} from '../fToKline';

/*
From Kraken Documentation
[[
 MTS:	number second timestamp,
 ? string	First execution during the time frame,
 OPEN:	string	First execution during the time frame,
 HIGH:	string	Highest execution during the time frame,
 LOW:	string	Lowest execution during the timeframe,
 CLOSE:	string	Last execution during the time frame,
 VOLUME:	string	Quantity of symbol traded within the timeframe
 NmbOfTr: number of trades
]]
*/



const toKline = fToKline({
  ...crOptionsFromStr(),
  o: 1,
  h: 2,
  l: 3,
  c: 4,
  v: 6
});

export default toKline
