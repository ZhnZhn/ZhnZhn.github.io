import Big from 'big.js';

import {
  DT_UP,
  DT_DOWN,
  DT_EQUAL
} from '../constants/DirectionType';

const MAX_TO_ROUND = 1000000;
const FN_ECHO = value => value;

const _isNumber = n => typeof n === 'number'
 && (n - n === 0);

const _formatedToBig = (v=0, dfR) => {
  const _b = Big(v.toString().replace(/\s/g,''));
  return _isNumber(dfR)
    ? _b.round(dfR)
    : _b;
}

const _toBig = (bValue) => {
  if (bValue instanceof Big) {
    return bValue;
  }
  try {
    return new Big(bValue);
  } catch(err) {
    return new Big(0);
  }
};

const _roundBig = (bValue) => {
  const _bValue = bValue.round(4);
  return _bValue.gt(MAX_TO_ROUND)
     ? bValue.toFixed(0)
     : _bValue;
};

export const roundBy = (nOrStr, by=2) => {
  if (nOrStr == null) {
    return null;
  }
  const _floatOrNaN = parseFloat(nOrStr);
  return _floatOrNaN - _floatOrNaN === 0
    ? parseFloat(Big(nOrStr).toFixed(by))
    : _floatOrNaN;
}

export const calcPercent = ({
  bValue=Big(0),
  bTotal=Big(0)
}) => {
  bValue = _toBig(bValue)
  bTotal = _toBig(bTotal)
  return !bTotal.eq(Big(0))
    ? bValue.times(100).div(bTotal).abs().toFixed(2)
    : Big(0).toFixed(2);
}

const _toStr = (bValue) => bValue.toString();

export const crValueMoving = ({
  nowValue,
  prevValue,
  fnFormat=FN_ECHO,
  dfR
}={}) => {
  const bNowValue = _formatedToBig(nowValue, dfR)
  , bPrevValue = _formatedToBig(prevValue, dfR)
  , _bDelta = bPrevValue.minus(bNowValue)
  , _direction = _bDelta.gt(0.0)
       ? DT_DOWN
       : _bDelta.lt(0.0) ? DT_UP : DT_EQUAL
  , _bPercent = calcPercent({
       bValue:_bDelta,
       bTotal: bPrevValue
  })
  , _bNowValue = _roundBig(bNowValue)
  , _bDeltaAbs = _roundBig(_bDelta.abs());

  return {
    value: _toStr(fnFormat(_bNowValue)),
    _value: _toStr(_bNowValue),
    delta: _toStr(fnFormat(_bDeltaAbs)),
    _deltaAbs: _toStr(_bDeltaAbs),
    percent: _toStr(_bPercent) + '%',
    _percentAbs: _toStr(_bPercent),
    direction: _direction
  };
}

export const toFixed = (value) => {
  const bValue = Big(value);
  return bValue.gt('10')
    ? parseInt(bValue.toFixed(0), 10)
    : parseFloat(bValue.toFixed(2));
}

export const toFixedNumber = (
  value
) => !_isNumber(value)
  ? value
  : roundBy(
      value,
      value<10 ? 4
       : value<10000 ? 2
          : 0
  )

export const crId = (prefix) => (
  (prefix || '') +
  Date.now().toString(36) +
  Math.random().toString(36).slice(2, 9)
)
