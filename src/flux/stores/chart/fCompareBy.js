import Big from 'big.js'

import {
  DT_DOWN
} from '../../../constants/DirectionType';

const MIN_STR = String(Number.MIN_SAFE_INTEGER);
const ABS_PROP = 'Abs';

const _getValueMoving = item =>
  (item || {}).valueMoving || {};

const _crBigForValue = (item, propName) =>
  Big(_getValueMoving(item)[propName] || MIN_STR);

const _crBigForAbsValue = (item, propName) => {
  const _b = _crBigForValue(item, propName)
  , { direction } = _getValueMoving(item);
  return direction === DT_DOWN
    ? _b.times(-1)
    : _b;
};

const fCompareBy = (propName) => {
  const _crBig = propName.indexOf(ABS_PROP) !== -1
    ? _crBigForAbsValue
    : _crBigForValue;
  return (aC, bC) => {
    const a = _crBig(aC, propName)
    , b = _crBig(bC, propName);

    if (a.gt(b)) return 1;
    if (b.gt(a)) return -1;
    return 0;
  }
};

export default fCompareBy
