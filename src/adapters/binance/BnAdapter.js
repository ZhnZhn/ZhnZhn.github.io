import AdapterFn from '../AdapterFn'
import crAdapterOHLCV from '../crAdapterOHLCV'

const { crItemLink } = AdapterFn

const _crZhConfig = ({
    _itemKey,
    itemCaption,
    dataSource
  }) => ({
    id: _itemKey, key: _itemKey,
    itemCaption,
    dataSource
  });

const _crResearchLink = crItemLink
    .bind(null, 'Binance Research');
const _crTradeLink = crItemLink
    .bind(null, 'Binance Trade Chart');

const _crDescription = ({ _researchLink, _tradeLink }) =>
 _crResearchLink(_researchLink, "padding-bottom: 8px;")
 + _crTradeLink(_tradeLink);

const _crInfo = (option) => ({
  name: option.title,
  description: _crDescription(option)
})

const _crAddConfig = ({ option }) => ({
  zhConfig: _crZhConfig(option),
  info: _crInfo(option)
})

/*
From Binance API Documentation
[
    1499040000000,      // Open time
    "0.01634790",       // Open
    "0.80000000",       // High
    "0.01575800",       // Low
    "0.01577100",       // Close
    "148976.11427815",  // Volume
    1499644799999,      // Close time
    "2434.19055334",    // Quote asset volume
    308,                // Number of trades
    "1756.87402397",    // Taker buy base asset volume
    "28.46694368",      // Taker buy quote asset volume
    "17928899.62484339" // Ignore.
  ]
*/

const _crDataOHLCV = json => json.map(item => ({
  date: item[6],
  open: parseFloat(item[1]),
  high: parseFloat(item[2]),
  low: parseFloat(item[3]),
  close: parseFloat(item[4]),
  volume: parseFloat(item[5])
}))

const BnAdapter = crAdapterOHLCV({
  getArr: _crDataOHLCV,
  toDate: date => date,
  crAddConfig: _crAddConfig
})

export default BnAdapter
