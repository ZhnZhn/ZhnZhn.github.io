import { roundByOHLC } from '../AdapterFn';

import fToKline from '../fToKline';

/*
From Bitfinex Documentation
[[
 MTS:	int	millisecond time stamp,
 OPEN:	float	First execution during the time frame,
 CLOSE:	float	Last execution during the time frame,
 HIGH:	float	Highest execution during the time frame,
 LOW:	float	Lowest execution during the timeframe,
 VOLUME:	float	Quantity of symbol traded within the timeframe
]]
*/

const toKline = fToKline({
  crValue: (v) => roundByOHLC(v)
})

export default toKline
