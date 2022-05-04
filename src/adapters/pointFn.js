import Big from 'big.js'
import C from '../constants/Color'

const _assign = Object.assign

export const crVolumePoint = ({
  date,
  open,
  close,
  volume,
  option
}) => {
  const _color = open && close>open
    ? C.GREEN
    : open && close<open
       ? C.RED
       : C.GRAY;

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
    ? C.RED
    : !_bDelta.gte(0.0)
        ? C.GREEN
        : open ? C.GRAY : C.WHITE;

  return {
    x: date,
    y: parseFloat(_bPercent),
    close: close,
    open: open ? open : 'Unknown',
    color: _color
  };
}
