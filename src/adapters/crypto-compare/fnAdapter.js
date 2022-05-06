export { getValue } from '../AdapterFn';
export { crError } from '../crFn';

import {
  roundBy,
  crZhConfig
} from '../AdapterFn';
import { crVolumePoint } from '../pointFn';

export const _assign = Object.assign

const _crZhConfig = (option) => {
  const { linkFn, value } = option;
  return _assign(crZhConfig(option), {
    linkFn,
    item: value
  });
}

const _crInfo = ({
  itemCaption
}) => ({
  name: itemCaption
});

const _isNumber = v => typeof v === 'number';

const _isHLOC = (p) => _isNumber(p.open)
  && _isNumber(p.high)
  && _isNumber(p.low)
  && _isNumber(p.close);

const _addPointTo = (arr, d, value) => {
  if (_isNumber(value)) {
    //arr.push({ x: d, y: value })
    arr.push([d, value ])
  }
};
const _addColumnPointTo = (
  arr,
  date,
  p,
  volume
) => {
  if (_isNumber(volume)){
    arr.push(
      crVolumePoint({
         date: date,
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

const _addHLPointTo = (
  arr,
  date,
  p
) => {
    arr.push({
      x: date,
      high: roundBy(p.high - p.close, 2),
      low: roundBy(p.low - p.close, 2),
      open: p.open,
      dayHigh: p.high,
      dayLow: p.low,
      close: p.close
    })
};

export const crData = (
  json
) => {
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
    dVolume,
    dColumn,
    dToVolume,
    dHL
  };
}

export const crConfOption = (
  option
) => ({
  zhConfig: _crZhConfig(option),
  info: _crInfo(option)
})
