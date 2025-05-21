import { isNumber } from '../../utils/isTypeFn';

export const fCompareBy2 = (
  compareBy1,
  compareBy2
) => (
  a,
  b
) => compareBy1(a, b) || compareBy2(a, b)

export const fNegate = fn => (
  ...args
) => -1 * fn(...args)

const _compareDescValue = (
  v1,
  v2
) => v1 < v2
  ? 1
  : v1 > v2
  ? -1
  : 0;

const _compareDescMaybeNumber = (
  v1,
  v2,
  _isNumber1,
  _isNumber2
) => _isNumber1 && _isNumber2
  ? _compareDescValue(v1, v2)
  : !_isNumber1 && !_isNumber2
  ? 0
  : _isNumber1
  ? -1
  : 1;

export const fCompareDescBy = (
  TOKEN_NAN,
  pn
) => (a, b) => {
  const v1 = a[pn]
  , v2 = b[pn]
  , _isNumber1 = isNumber(v1);
  return _isNumber1 || v1 === TOKEN_NAN || v1 === null
    ? _compareDescMaybeNumber(v1, v2, _isNumber1, isNumber(v2))
    : _compareDescValue(v1, v2);
}
