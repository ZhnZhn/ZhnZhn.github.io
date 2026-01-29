import Highcharts from 'highcharts';

import {
  isNumber,
  isStr
} from './isTypeFn';

const _formatNumber = Highcharts.numberFormat
, _formatNumberImpl = (
  numberOr,
  precision
) => _formatNumber(numberOr, precision, '.', ' ');
const _isNumberInRange = (
  v,
  min,
  max
) => v > min && v < max;

const _findPrecision = (
  numberOrStr
) => {
  const _strDecimal = (''+numberOrStr).split('.')[1];
  return _strDecimal
    ? _strDecimal.length
    : 0;
}

const _mathMin = Math.min;
const _crPrecision = number => {
  const _precision = _findPrecision(number);
  return _isNumberInRange(number, -1, 1)
    ? _mathMin(_precision, 4)
    : _isNumberInRange(number, -100000, 100000)
    ? _mathMin(_precision, 2)
    : 0;
};

export const formatNumber = (
  numberOr,
  isSamePrecision
) => !isNumber(numberOr)
  ? '0.00'
  : _isNumberInRange(numberOr, -0.01, 0.01)
  ? ''+numberOr
  : _formatNumberImpl(
      numberOr,
      isSamePrecision
        ? _findPrecision(numberOr)
        : _crPrecision(numberOr)
    )

const REG_BLANKS = /\s/g
, STR_ZERO = '0'

export const formatAllNumber = (
  value,
  dfValue
) => {
  if (value === 0) {
    return STR_ZERO;
  }
  if (!value) {
    return isStr(dfValue)
      ? dfValue
      : STR_ZERO;
  }
  if (_isNumberInRange(value, -1000, 1000)) {
    return ''+value;
  }

  const _value = (''+value).replace(REG_BLANKS, '');
  return _formatNumberImpl(
    _value,
    _findPrecision(_value)
  );
}
