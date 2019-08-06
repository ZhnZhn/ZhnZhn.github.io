import AdapterFn from '../AdapterFn'
import AdapterStockFn from '../AdapterStockFn'

const {
  toFloatOrNull,
  valueMoving
} = AdapterFn;
const { toSeriesData } = AdapterStockFn;

const _crZhConfig = ({ _itemId, value, dataSource }) => ({
  dataSource,
  id: _itemId,
  key: _itemId,
  item: value,
  linkFn: "NASDAQ",
  isWithLegend: true,
  isWithoutAdd: true,
  legend: AdapterFn.stockSeriesLegend()
});

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
    zhConfig: _crZhConfig(option),
    valueMoving: valueMoving(data),
    info: _crInfo(option)
  })
};

export default fnAdapter
