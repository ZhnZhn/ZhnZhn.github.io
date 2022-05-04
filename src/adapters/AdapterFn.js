import Big from 'big.js';

import { toTd } from '../charts/dateFormat';

import { isInArrStr } from '../utils/arrFn';
import fCompareBy from '../utils/fCompareBy';
import fCompareByTwoProps from '../utils/fCompareByTwoProps';
import formatAllNumber from '../utils/formatAllNumber';
import {
  getC,
  getV
} from '../utils/getPropertyFn';

import {
  ymdToUTC,
  ymdhmsToUTC,
  mlsToDmy,
  getFromDate,
  getYmdhmUTC,
  getYear,
  getCurrentYear,
  monthIndex
} from '../utils/DateUtils';
import toUpperCaseFirst from '../utils/toUpperCaseFirst'

import {
  roundBy,
  crValueMoving
} from '../math/mathFn'
import {
  findMinY,
  findMaxY,
  filterTrimZero
} from '../math/seriaFn'

import { Direction } from '../constants/Type'

import crFn from './crFn'


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

  toTd: (mls) => _isNumber(mls)
    ? toTd(mls)
    : '',

  ymdToUTC,
  ymdhmsToUTC,
  getFromDate,
  getYmdhmUTC,
  getYear,
  getCurrentYear,
  monthIndex,

  getCaption: getC,
  getValue: getV,
  isInArrStr,

  roundBy,
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
  }) => crValueMoving({
    nowValue: bNowValue,
    prevValue: bPrevValue,
    fnFormat: formatAllNumber,
    dfR
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

  toUpperCaseFirst,

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
  },

  crZhConfig: ({
    _itemKey,
    itemCaption,
    dataSource
  }) => ({
    id: _itemKey, key: _itemKey,
    itemCaption,
    dataSource
  })
};

export default AdapterFn
