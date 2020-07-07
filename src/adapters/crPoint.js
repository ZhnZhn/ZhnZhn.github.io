import Big from 'big.js'
import C from '../constants/Color'

const _assign = Object.assign

const crPoint = {
  crVolumePoint: ({ date, open, close, volume, option }) => {
    let _color;
    if (open && close>open) {
      _color = C.GREEN
    } else if (open && close<open) {
      _color = C.RED
    } else {
      _color = C.GRAY
    }

    return _assign({
      x: date, y: volume, color: _color,
      _open: open, _close: close
    }, option);
  },

  //date, prevClose as close, open
  crAthPoint: ({ date, close, open }) => {
    const _bDelta = (open && close)
             ? Big(close).minus(open)
             : Big('0.0')
        , _bPercent = close
             ? _bDelta.times(100).div(close).abs().toFixed(2)
             : Big('0.0');

    let _color;
    if (_bDelta.gt(0.0)){
      _color = C.RED;
    }
    else if (!_bDelta.gte(0.0)){
      _color = C.GREEN;
    } else {
      _color = (open) ? C.GRAY : C.WHITE;
    }

    return {
      x: date,
      y: parseFloat(_bPercent),
      close: close,
      open: open ? open : 'Unknown',
      color: _color
    };
  }
}

export default crPoint
