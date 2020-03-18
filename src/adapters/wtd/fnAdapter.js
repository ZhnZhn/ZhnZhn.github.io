import AdapterFn from '../AdapterFn'
import AdapterStockFn from '../AdapterStockFn'

const {
  crItemConf,
  crValueConf,
  toFloatOrNull,
  valueMoving
} = AdapterFn;
const { toSeriesData } = AdapterStockFn;

const _crZhConfig = (option, data) => {
  const { _itemId, value, dataSource } = option;
  return {
    id: _itemId,
    key: _itemId,
    item: _itemId,
    linkFn: "NASDAQ",
    dataSource,
    itemConf: {
      _itemKey: _itemId,
      ...crItemConf(option),
      ...crValueConf(data),
      symbol: value,
      dataSource
    },    
    legend: AdapterFn.stockSeriesLegend()
  }
};

const _crInfo = ({ title, toDate, fromDate }) => ({
  frequency: "Daily",
  name: title,
  toDate, fromDate
});

const _crPoint = ({ open, close, high, low, volume } = {}, date) => ({
  date,
  open: toFloatOrNull(open),
  close: toFloatOrNull(close),
  high: toFloatOrNull(high),
  low: toFloatOrNull(low),
  volume: toFloatOrNull(volume)
});

const fnAdapter = {

   crData: (json, option) => {
    const {
      isNotZoomToMinMax,
      isDrawDeltaExtrems
    } = option
    , { history } = json
    , keys = Object.keys(history)
    , arrPoint = []
    , max = keys.length;
    let i = 0;
    for (i; i<max; i++){
      const _dateKey = keys[i];
      arrPoint.push(
        _crPoint(history[_dateKey], _dateKey)
      )
    }
    return toSeriesData(arrPoint, {
      isNotZoomToMinMax,
      isDrawDeltaExtrems
    });
  },

  crConfigOption: ({ data, option }) => ({
    zhConfig: _crZhConfig(option, data),
    valueMoving: valueMoving(data),
    info: _crInfo(option)
  })
};

export default fnAdapter
