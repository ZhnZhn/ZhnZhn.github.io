import AdapterFn from '../AdapterFn';
import crAdapterOHLCV from '../crAdapterOHLCV';

const { crZhConfig, roundBy } = AdapterFn;

const _crAddConfig = ({ option }) => ({
  zhConfig: crZhConfig(option)
});

const _isNumber = n => typeof n === 'number'
, _compareByDate = (a, b) => a.date - b.date
, _roundBy = n => {
  if (n>-1 && n<1) { return n; }
  return roundBy(n, 2);
};

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

const _crDataOHLCV = (json, option) => {
  const _data = [];
  json.forEach(arrItem => {
    if (_isNumber(arrItem[0])) {
      _data.push({
         date: arrItem[0],
         open: _roundBy(arrItem[1]),
         high: _roundBy(arrItem[3]),
         low: _roundBy(arrItem[4]),
         close: _roundBy(arrItem[2]),
         volume: arrItem[5]
       })
    }
  })
  return _data.sort(_compareByDate);
};

const toKline = crAdapterOHLCV({
  getArr: _crDataOHLCV,
  toDate: date => date,
  crAddConfig: _crAddConfig
});

export default toKline
