import Big from 'big.js'

import {
  DT_DOWN
} from '../../../constants/DirectionType';
import {
  isTokenInStr
} from '../../../utils/strFn';

const MIN_STR = String(Number.MIN_SAFE_INTEGER);
const ABS_PROP = 'Abs';

const _getValueMoving = (
  item
)=> (item || {}).valueMoving || {};

const _crBigForValue = (
  item,
  propName
) => Big(_getValueMoving(item)[propName] || MIN_STR);

const _crBigForAbsValue = (
  item,
  propName
) => {
  const _b = _crBigForValue(item, propName)
  , { direction } = _getValueMoving(item);
  return direction === DT_DOWN
    ? _b.times(-1)
    : _b;
};

const fCompareBy = (propName) => {
  const _crBig = isTokenInStr(propName, ABS_PROP)
    ? _crBigForAbsValue
    : _crBigForValue;
  return (aC, bC) => {
    const a = _crBig(aC, propName)
    , b = _crBig(bC, propName);
    return a.gt(b)
      ? 1
      : b.gt(a)
      ? -1
      : 0;
  }
};

export default fCompareBy
