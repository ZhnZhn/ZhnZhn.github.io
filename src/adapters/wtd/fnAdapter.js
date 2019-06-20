import AdapterFn from '../AdapterFn'

const {
  ymdtToUTC,
  volumeColumnPoint,
  athPoint,
  valueMoving
} = AdapterFn;

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

const _parseToFloat = (item) => {
  const { open, close, high, low, volume } = item;
  item.open = parseFloat(open)
  item.close = parseFloat(close)
  item.high = parseFloat(high)
  item.low = parseFloat(low)
  item.volume = parseFloat(volume)
  return item;
}

const fnAdapter = {

   crData: (json, option) => {
    const {
      isNotZoomToMinMax,
      isDrawDeltaExtrems
    } = option
    , { history } = json
    , keys = Object.keys(history)
    , data = []
    , dataHigh = []
    , dataLow = []
    , dataOpen = []
    , dataVolumeColumn = []
    , dataVolume = []
    , dataATH = []
    , max = keys.length;
    let minClose = Number.POSITIVE_INFINITY
    , maxClose = Number.NEGATIVE_INFINITY
    , _prevClose
    , i = 0;
    for (i; i<max; i++){
      const _dateKey = keys[i]
      , _item = history[_dateKey]
      , { open, close, high, low, volume } = _parseToFloat(_item)
      , date = ymdtToUTC(_dateKey);
      data.push([date, close])
      dataHigh.push([date, high])
      dataLow.push([date, low])
      dataOpen.push([date, open])
      dataVolume.push([date, volume])
      dataVolumeColumn.push(
          volumeColumnPoint({
             open, close, volume, date,
             option: { _high: high, _low: low }
          })
      )
      if (typeof _prevClose !== 'undefined'){
        dataATH.push(
           athPoint({
             date, prevClose: _prevClose, open
           })
        )
      }
      _prevClose = close

      if (minClose > close) { minClose = close }
      if (maxClose < close ) { maxClose = close }
    }

    return {
      isNotZoomToMinMax,
      isDrawDeltaExtrems,
      data,
      dataHigh,
      dataLow,
      dataOpen,
      dataVolumeColumn,
      dataVolume,
      dataATH,
      minClose,
      maxClose
    };
  },

  crConfigOption: ({ data, option }) => ({
    zhConfig: _crZhConfig(option),
    valueMoving: valueMoving(data),
    info: _crInfo(option)
  })
};

export default fnAdapter
