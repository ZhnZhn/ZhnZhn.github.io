import AdapterFn from '../AdapterFn'
import crAdapterOHLCV from '../crAdapterOHLCV'

const { crZhConfig, isInArrStr } = AdapterFn;

const _crAddConfig = ({ option }) => ({
  zhConfig: crZhConfig(option)
});

/*
From Bitstamp API Documentation
  {
     "high": "18638.71",
     "timestamp": "1606723200",
     "volume": "402.30570712",
     "low": "18390.00",
     "close": "18471.42",
     "open": "18633.43"
   }
*/

const _isDailyTimeframe = isInArrStr(["86400", "259200"])
, _isHourlyTimeframe = isInArrStr(["3600","7200","14400","21600","43200"]);

const DAILY_TIME_DELTA = 86_394_000; //1000*60*60*24 - 1000*60
const HOURLY_TIME_DELTA = 3_540_000; //1000*60*59
const _toMls = timestamp => parseFloat(timestamp)*1000
, _fToMls = (delta) => (timestamp, isRecent) => isRecent
   ? Date.now() - 6000 //1000*60
   : _toMls(timestamp) + delta
, _toDailyMls = _fToMls(DAILY_TIME_DELTA)
, _toHourlyMls = _fToMls(HOURLY_TIME_DELTA);

const _crDataOHLCV = (json, option) => {
  const { ohlc } = json.data
  , _recentIndex = ohlc.length - 1
  , { timeframe } = option
  , _toDate = _isDailyTimeframe(timeframe)
     ? _toDailyMls
     : _isHourlyTimeframe(timeframe)
         ? _toHourlyMls
         : _toMls;
  return ohlc.map((item, index) => ({
    date: _toDate(item.timestamp, index === _recentIndex),
    open: parseFloat(item.open),
    high: parseFloat(item.high),
    low: parseFloat(item.low),
    close: parseFloat(item.close),
    volume: parseFloat(item.volume)
  }));
}

const toKline = crAdapterOHLCV({
  getArr: _crDataOHLCV,
  toDate: date => date,
  crAddConfig: _crAddConfig
});

export default toKline
