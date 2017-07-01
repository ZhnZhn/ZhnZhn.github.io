
import Big from 'big.js'

import C from './Colors'

const AdapterFn = {
  ymdToUTC(date) {
    const _arr = date.split('-');
    return Date.UTC(
      _arr[0], (parseInt(_arr[1], 10)-1), _arr[2]
    );
  },

  volumeColumnPoint({ date, open, close, volume, option }) {
    let _color;
    if (open && close > open) {
      _color = C.COLOR_GREEN
    } else if (open && close<open) {
      _color = C.COLOR_RED
    } else {
      _color = C.COLOR_GRAY
    }

    return Object.assign({
      x: date, y: volume, color: _color,
      _open: open, _close: close
    }, option);
  },

  athPoint({ date, prevClose, open }) {
    const _bDelta = (open && prevClose)
             ? Big(prevClose).minus(open)
             : Big('0.0')
        , _bPercent = (prevClose)
            ? _bDelta.times(100).div(prevClose).abs().toFixed(2)
            : Big('0.0');

    let _color;
    if (_bDelta.gt(0.0)){
      _color = C.COLOR_RED;
    }
    else if (!_bDelta.gte(0.0)){
      _color = C.COLOR_GREEN;
    } else {
      _color = (open) ? C.COLOR_GRAY : C.COLOR_WHITE;
    }

    return {
      x : date,
      y : parseFloat(_bPercent),
      close : prevClose,
      open : open ? open : 'Unknown',
      color : _color
    };
  }
}

export default AdapterFn
