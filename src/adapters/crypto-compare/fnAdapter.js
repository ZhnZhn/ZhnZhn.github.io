
import AdapterFn from '../AdapterFn'

const {
  valueMoving, crZhFn,
  volumeColumnPoint
} = AdapterFn;

const _crZhConfig = (option) => {
  const {
          title, dataSource, value, linkFn
        } = option;
  return {
    id: value, key: value,
    itemCaption: title,
    isWithoutAdd: true,
    isWithLegend: false,
    linkFn, item: value,
    dataSource
  };
};

const _crInfo = ({ title }) => ({
  name: title
});

const _isNumber = v => typeof v === 'number';

const _isHLOC = (p) => {
  return _isNumber(p.open)
     && _isNumber(p.high)
     && _isNumber(p.low)
     && _isNumber(p.close);
};

const _addPointTo = (arr, d, value) => {
  if (_isNumber(value)) {
    arr.push({ x: d, y: value })
  }
};
const _addColumnPointTo = (arr, d, p, volume) => {
  if (_isNumber(volume)){
    arr.push(
      volumeColumnPoint({
         date: d,
         open: p.open,
         close: p.close,
         volume: volume,
         option: {
            _high: p.high,
            _low: p.low
          }
      })
    )
  }
};
const _addHLPointTo = (arr, d, p) => {
    arr.push({
      x: d,
      high: parseFloat((p.high - p.close).toFixed(2)),
      low: parseFloat((p.low - p.close).toFixed(2)),
      open: p.open,
      dayHigh: p.high,
      dayLow: p.low,
      close: p.close
    })
};

const fnAdapter = {
  crData: (json) => {
    const data = []
        , dVolume = []
        , dColumn = []
        , dToVolume = []
        , dHL = [];
    json.Data.forEach(p => {
      if (_isNumber(p.time)) {
        const _date = p.time*1000;
        _addPointTo(data, _date, p.close)
        _addPointTo(dVolume, _date, p.volumefrom)
        _addPointTo(dToVolume, _date, p.volumeto)

        if (_isHLOC(p)) {
          _addColumnPointTo(dColumn,
            _date, p, p.volumefrom
          )
          _addHLPointTo(dHL, _date, p)
        }
      }
    })
    return {
      data,
      dVolume, dColumn,
      dToVolume,
      dHL
    };
  },

  crConfigOption: ({ option, data }) => ({
    zhConfig: _crZhConfig(option),
    valueMoving: valueMoving(data),
    info: _crInfo(option),
    ...crZhFn()
  })
};

export default fnAdapter
