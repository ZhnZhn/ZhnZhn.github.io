import Big from 'big.js';

import { toTd as _toTd } from '../charts/dateFormat';
export { isInArrStr } from '../utils/arrFn';
import formatAllNumber from '../utils/formatAllNumber';
import {
  getC,
  getV
} from '../utils/getPropertyFn';

import { mlsToDmy } from '../utils/DateUtils';
export {
  ymdToUTC,
  ymdhmsToUTC,
  getFromDate,
  getYmdhmUTC,
  getYear,
  getCurrentYear,
  monthIndex
} from '../utils/DateUtils';
import _toUpperCaseFirst from '../utils/toUpperCaseFirst'
import { crValueMoving as _crVm } from '../math/mathFn'
export {
  roundBy
} from '../math/mathFn'
export {
  findMinY,
  findMaxY,
  filterTrimZero
} from '../math/seriaFn'

import { Direction } from '../constants/Type'
import {
  getPointDate,
  getPointValue
} from './getterPointFn';

const EMPTY = '';

const _isNaN = Number.isNaN
, _isArr = Array.isArray
, _isNumber = n => typeof n === 'number'
    && (n - n) === 0;
const _fIsNumber = (pn) => (p) => {
  return typeof p[pn] === 'number'
    && isFinite(p[pn]);
}

const _crBigValueFrom = point => Big(getPointValue(point));
const _crDmyFrom = point => mlsToDmy(getPointDate(point));

const _fToFloatOr = dfValue => str => {
  const _v = parseFloat(str);
  return _isNaN(_v) ? dfValue : _v;
};


export const toTd = (mls) => _isNumber(mls)
  ? _toTd(mls)
  : ''

export const getCaption = getC
export const getValue = getV

export const numberFormat = formatAllNumber
export const isNumberOrNull = v => _isNumber(v) || v === null
export const isYNumber = _fIsNumber('y')
export const toFloatOrEmpty = _fToFloatOr('')

export const crValueMoving = ({
  bNowValue=Big('0.0'),
  bPrevValue=Big('0.0'),
  dfR
}) => _crVm({
  nowValue: bNowValue,
  prevValue: bPrevValue,
  fnFormat: formatAllNumber,
  dfR
})

export const valueMoving = (data, dfR) => {
  if (!_isArr(data)) {
    return {
      date: data,
      direction: Direction.EMPTY
    };
 }

  const len = data.length
  , _pointNow = data[len-1] || [ EMPTY, 0 ]
  , bNowValue = _crBigValueFrom(_pointNow)
  , _pointPrev = data[len-2] || _pointNow
  , bPrevValue = _crBigValueFrom(_pointPrev)
  , date = _crDmyFrom(_pointNow)
  , dateTo = _crDmyFrom(_pointPrev);

  return  {
    ...crValueMoving({ bNowValue, bPrevValue, dfR }),
    valueTo: formatAllNumber(bPrevValue),
    date, dateTo
  };
}

export const joinBy = (
  delimeter,
  ...restItems
) => restItems
  .filter(Boolean)
  .join(delimeter)

export const toUpperCaseFirst = _toUpperCaseFirst

export const mapIf = (
  arr,
  crItem,
  is
) => {
  const _items = [];
  (arr || []).forEach(v => {
    if (is(v)) {
      _items.push(crItem(v))
    }
  })
  return _items;
}

export const crZhConfig = ({
  _itemKey,
  itemCaption,
  dataSource
}) => ({
  id: _itemKey, key: _itemKey,
  itemCaption,
  dataSource
})
