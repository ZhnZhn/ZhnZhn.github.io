import Big from 'big.js'

const fnEcho = value => value;

const MAX_TO_ROUND = '1000000';

const _isNumber = n => typeof n === 'number'
 && !Number.isNaN(n);

const _formatedToBig = (v='0.0') => Big(
  v.toString().replace(/\s/g,'')
);

const _roundBig = (bValue) => {
  let _bValue = bValue.round(4);
  if ( _bValue.gt(MAX_TO_ROUND) ){
    _bValue = bValue.toFixed(0);
  }
  return _bValue;
};

const mathFn = {

  calcPercent: ({ bValue=Big('0.0'), bTotal=Big('0.0') }) => {
    return !bTotal.eq(Big(0.0))
      ? bValue.times(100).div(bTotal).abs().toFixed(2)
      : Big(0.0).toFixed(2);
  },

  crValueMoving: (option) => {
    const {
      nowValue,
      prevValue,
      Direction:D={},
      fnFormat=fnEcho
    } = option
    , bNowValue = _formatedToBig(nowValue)
    , bPrevValue = _formatedToBig(prevValue)
    , _bDelta = bPrevValue.minus(bNowValue)
    , _direction = _bDelta.gt(0.0)
         ? D.DOWN
         : _bDelta.lt(0.0)
              ? D.UP
              : D.EQUAL;

    const _bPercent = mathFn.calcPercent({
      bValue:_bDelta, bTotal: bPrevValue
    });

    const _bNowValue = _roundBig(bNowValue)
    , _bDeltaAbs = _roundBig(_bDelta.abs());
    /*
    let _bNowValue = Big(bNowValue).round(4);
    if ( _bNowValue.gt(MAX_TO_ROUND) ){
      _bNowValue = bNowValue.toFixed(0);
    }
    let _bDeltaAbs = _bDelta.abs().round(4);
    if (_bDeltaAbs.gt(MAX_TO_ROUND)) {
      _bDeltaAbs = _bDelta.abs().round(0)
    }
    */

    return {
      value: fnFormat(_bNowValue).toString(),
      _value: _bNowValue.toString(),
      delta: fnFormat(_bDeltaAbs).toString(),
      _deltaAbs: _bDeltaAbs.toString(),
      percent: _bPercent.toString() + '%',
      _percentAbs: _bPercent.toString(),
      direction: _direction
    };
  },

  toFixed: (value) => {
    const bValue = Big(value);
    return bValue.gt('10')
      ? parseInt(bValue.toFixed(0), 10)
      : parseFloat(bValue.toFixed(2));
  },

  toFixedNumber: (value) => {
    if ( !_isNumber(value) ) {
      return value;
    }
    if ( value<10 ) {
      return Number(value.toFixed(4));
    } else if ( value<10000 ) {
      return Number(value.toFixed(2));
    } else {
      return Number(value.toFixed(0));
    }
  }
}

export default mathFn
