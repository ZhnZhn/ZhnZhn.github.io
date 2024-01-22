import {
  optionsCrFromStr,
  fToKline
} from '../fToKline';

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

const toKline = fToKline({
  ...optionsCrFromStr
});

export default toKline
