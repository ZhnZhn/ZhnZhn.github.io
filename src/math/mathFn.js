import Big from 'big.js'

const fnEcho = value => value;

const MAX_TO_ROUND = '1000000';

const _isNumber = n => typeof n === 'number'
 && !Number.isNaN(n);

const _formatedToBig = (v='0.0', dfR) => {
  const _b = Big(v.toString().replace(/\s/g,''));
  return _isNumber(dfR)
    ? _b.round(dfR)
    : _b;
}

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
      fnFormat=fnEcho,
      dfR
    } = option
    , bNowValue = _formatedToBig(nowValue, dfR)
    , bPrevValue = _formatedToBig(prevValue, dfR)
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
