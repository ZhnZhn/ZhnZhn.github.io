import { roundByOHLC } from '../AdapterFn';

import fToKline from '../fToKline';

/*
From KuCoin Documentation
[[
 MTS:	string	millisecond time stamp,
 OPEN:	string	First execution during the time frame,
 CLOSE:	string	Last execution during the time frame,
 HIGH:	string	Highest execution during the time frame,
 LOW:	string	Lowest execution during the timeframe,
 VOLUME:	string	Quantity of symbol traded within the timeframe
]]
*/

const _parseFloat = parseFloat;

const toKline = fToKline({
  crDate: (v) => _parseFloat(v)*1000,
  crValue: (v) => roundByOHLC(_parseFloat(v)),
  crVolume: (v) => _parseFloat(v)
});

export default toKline
