import {
  crError,
  crZhConfig,
  roundBy
} from '../AdapterFn';
import crAdapterOHLCV from '../crAdapterOHLCV';

const _crAddConfig = ({ option }) => ({
  zhConfig: crZhConfig(option)
});

const _compareByDate = (a, b) => a.date - b.date
, _roundBy = n => {
  if (n>-1 && n<1) { return n; }
  return roundBy(n, 2);
};

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

const _crDataOHLCV = (
  json,
  option
) => {
  const _data = [];
  try {
    json.forEach(arrItem => {
      _data.push({
         date: _parseFloat(arrItem[0])*1000,
         open: _roundBy(_parseFloat(arrItem[1])),
         high: _roundBy(_parseFloat(arrItem[3])),
         low: _roundBy(_parseFloat(arrItem[4])),
         close: _roundBy(_parseFloat(arrItem[2])),
         volume: _parseFloat(arrItem[5])
       })
    })
  } catch(err) {
    throw crError()
  }
  return _data.sort(_compareByDate);
};

const toKline = crAdapterOHLCV({
  getArr: _crDataOHLCV,
  toDate: date => date,
  crAddConfig: _crAddConfig
});

export default toKline
