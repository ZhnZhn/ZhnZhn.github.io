import Big from 'big.js'
import {
  COLOR_WHITE,
  COLOR_GREY,
  COLOR_GREEN,
  COLOR_RED
} from '../constants/Color'

const _assign = Object.assign

export const crVolumePoint = ({
  date,
  open,
  close,
  volume,
  option
}) => {
  const _color = open && close>open
    ? COLOR_GREEN
    : open && close<open
       ? COLOR_RED
       : COLOR_GREY;

  return _assign({
    x: date,
    y: volume,
    color: _color,
    _open: open,
    _close: close
  }, option);
}

//date, prevClose as close, open
export const crAthPoint = ({
  date,
  close,
  open
}) => {
  const _bDelta = (open && close)
    ? Big(close).minus(open)
    : Big('0.0')
  , _bPercent = close
    ? _bDelta.times(100).div(close).abs().toFixed(2)
    : Big('0.0')
  , _color = _bDelta.gt(0.0)
    ? COLOR_RED
    : !_bDelta.gte(0.0)
        ? COLOR_GREEN
        : open ? COLOR_GREY : COLOR_WHITE;

  return {
    x: date,
    y: parseFloat(_bPercent),
    close: close,
    open: open ? open : 'Unknown',
    color: _color
  };
}
