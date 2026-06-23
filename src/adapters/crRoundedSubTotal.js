import { isNumber } from '../utils/isTypeFn';
import { roundBy } from '../math/mathFn';

const _crSubValue = (
  value
) => isNumber(value)
  ? value
  : 0;

export const crItemRt = (
  value,
  rt
) => value >= 10
  ? rt
  : value >= 0.01
     ? 2
     : value >= 0.0001
        ? 4
        : 6

const _crSubTotalRt = (
  value,
  rt
) => isNumber(rt)
  ? crItemRt(value, rt)
  : 0;

const _isZeroValueCase = (
  v,
  sum
) => sum === 0 && v !== 0;

export const crRoundedSubTotal = (
  v1,
  v2,
  total,
  totalRt
) => {
  const _v1 = _crSubValue(v1)
  , _v2 = _crSubValue(v2)
  , _rt1 = _crSubTotalRt(_v1, totalRt)
  , _rt2 = _crSubTotalRt(_v2, totalRt)
  , _sum1 = roundBy(_v1, _rt1)
  , _sum2 = roundBy(_v2, _rt2);
  return _sum1 + _sum2 > total
    || _isZeroValueCase(_v1, _sum1)
    || _isZeroValueCase(_v2, _sum2)
    ? [
      roundBy(_v1, _rt1 + 1),
      roundBy(_v2, _rt2 + 1)
    ]
    : [
    _sum1,
    _sum2
    ];
}
