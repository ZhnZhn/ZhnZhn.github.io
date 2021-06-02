
import Big from 'big.js'

import dateFormat from '../charts/dateFormat'
import ut from '../utils/ut'

import mathFn from '../math/mathFn'
import seriaFn from '../math/seriaFn'

import { Direction } from '../constants/Type'

import crFn from './crFn'
import pointFn from './pointFn'
import legendFn from './legendFn'

const { toTd } = dateFormat
const {
  isInArrStr,
  dt,
  fCompareBy,
  fCompareByTwoProps,
  getC, getV,
  formatAllNumber
} = ut
, { findMinY, findMaxY, filterTrimZero } = seriaFn;

const {
  ymdToUTC,
  ymdhmsToUTC,
  mlsToDmy,
  getFromDate,
  getYmdhmUTC,
  monthIndex
} = dt;

const EMPTY = '';

const ITEM_CONF_PROP_NAMES = [
 'url', 'loadId',
 'title', 'subtitle', 'itemCaption',
 'seriaType',
 'items'
];

const _isNaN = Number.isNaN
, _isArr = Array.isArray
, _isNumber = n => typeof n === 'number'
    && (n - n) === 0;
const _fIsNumber = (pn) => (p) => {
  return typeof p[pn] === 'number'
    && isFinite(p[pn]);
}

const _getDate = point =>_isArr(point)
  ? point[0]
  : (point || {}).x;

const _getValue = (point) => _isArr(point)
  ? _isNumber(point[1])
       ? point[1]
       : '0.0'
  : point && _isNumber(point.y)
      ? point.y
      : '0.0';

const _crBigValueFrom = point => Big(_getValue(point));
const _crDmyFrom = point => mlsToDmy(_getDate(point));

const _fToFloatOr = dfValue => str => {
  const _v = parseFloat(str);
  return _isNaN(_v) ? dfValue : _v;
};

const AdapterFn = {
  ...crFn,
  ...pointFn,
  ...legendFn,


  toTd: (mls) => _isNumber(mls)
    ? toTd(mls)
    : '',

  ymdToUTC,
  ymdhmsToUTC,
  getFromDate,
  getYmdhmUTC,
  monthIndex,

  getCaption: getC,
  getValue: getV,
  isInArrStr,

  roundBy: mathFn.roundBy,
  numberFormat: formatAllNumber,

  isNumberOrNull: v => _isNumber(v) || v === null,

  isYNumber: _fIsNumber('y'),
  toFloatOrEmpty: _fToFloatOr(''),

  compareByDate: fCompareBy(0),
  compareByY: fCompareBy('y'),
  compareByValue: fCompareBy('value'),
  compareByValueId: fCompareByTwoProps('value', 'id'),

  crValueMoving: ({
    bNowValue=Big('0.0'),
    bPrevValue=Big('0.0'),
    dfR
  }) => mathFn.crValueMoving({
    nowValue: bNowValue,
    prevValue: bPrevValue,
    Direction: Direction,
    fnFormat: formatAllNumber,
    dfR: dfR
  }),


  valueMoving(data, dfR){
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
        ...AdapterFn.crValueMoving({ bNowValue, bPrevValue, dfR }),
        valueTo: formatAllNumber(bPrevValue),
        date, dateTo
      };
  },

  crItemConf: (option) => {
    const _itemConf = {};
    let _value;
    ITEM_CONF_PROP_NAMES.forEach(k => {
      _value = option[k]
      if (_value != null) {
        _itemConf[k] = _isArr(_value)
           ? _value.map(obj => ({...obj}))
           : _value
      }
     })
     return _itemConf;
  },

  crValueConf: data => {
    const _p = data[data.length-1];
    return {
      x: _getDate(_p),
      y: _getValue(_p)
    };
  },

  joinBy: (delimeter, ...restItems) => restItems
   .filter(Boolean)
   .join(delimeter),

  toUpperCaseFirst: (str) => typeof str === 'string'
    && str.length > 0
      ? str[0].toUpperCase() + str.substring(1)
      : EMPTY
  ,

  findMinY,
  findMaxY,
  filterTrimZero,

  mapIf: (arr, crItem, is) => {
    const _items = [];
    (arr || []).forEach(v => {
      if (is(v)) {
        _items.push(crItem(v))
      }
    })
    return _items;
  }
};

export default AdapterFn
