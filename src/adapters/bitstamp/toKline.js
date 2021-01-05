import crAdapterOHLCV from '../crAdapterOHLCV'

const _crZhConfig = ({
  _itemKey,
  itemCaption,
  dataSource
}) => ({
  id: _itemKey, key: _itemKey,
  itemCaption,
  dataSource
});

const _crAddConfig = ({ option }) => ({
  zhConfig: _crZhConfig(option)
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

const _crDataOHLCV = json => json.data.ohlc.map(item => ({
  date: parseFloat(item.timestamp)*1000,
  open: parseFloat(item.open),
  high: parseFloat(item.high),
  low: parseFloat(item.low),
  close: parseFloat(item.close),
  volume: parseFloat(item.volume)
}))

const toKline = crAdapterOHLCV({
  getArr: _crDataOHLCV,
  toDate: date => date,
  crAddConfig: _crAddConfig
});

export default toKline
