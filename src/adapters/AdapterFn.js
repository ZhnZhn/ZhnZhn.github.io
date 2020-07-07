
import Big from 'big.js'

import ut from '../utils/ut'

import mathFn from '../math/mathFn'
import seriaFn from '../math/seriaFn'

import { Direction } from '../constants/Type'
import C from '../constants/Color'
import crPoint from './crPoint'

const {
  dt,
  fCompareBy,
  fCompareByTwoProps,
  getC, getV,
  formatAllNumber
} = ut;
const { findMinY, findMaxY } = seriaFn;

const {
  ymdToUTC,
  ymdhmsToUTC,
  mlsToDmy,
  getFromDate
} = dt;

const EMPTY = '';
const HP_MONTH = {
  january: 0, february: 1,
  march: 2, april: 3, may: 4,
  june: 5, july: 6, august: 7,
  september: 8, october: 9, november: 10,
  december: 11
};

const ITEM_CONF_PROP_NAMES = [
 'url', 'loadId',
 'title', 'subtitle', 'itemCaption',
 'seriaType'
];

const _isNaN = Number && Number.isNaN || isNaN
, _isArr = Array.isArray
, _isNumber = n => typeof n === 'number'
    && (n - n) === 0;
const _fIsNumber = (pn) => (p) => {
  return typeof p[pn] === 'number'
    && isFinite(p[pn]);
}

const _getDate = point =>_isArr(point)
  ? point[0]
  : point.x;

const _getValue = (point) => {
  if (_isArr(point)){
    return _isNumber(point[1])
       ? point[1]
       : '0.0';
  } else {
    return point && _isNumber(point.y)
      ? point.y
      : '0.0';
  }
}

const _fToFloatOr = dfValue => str => {
  const _v = parseFloat(str);
  return _isNaN(_v) ? dfValue : _v;
};

const AdapterFn = {
  ...crPoint,

  ymdToUTC,
  ymdhmsToUTC,
  getFromDate,

  getCaption: getC,
  getValue: getV,
    
  legendItem: (index, color, name, is=false) => ({
    index, color, name,
    isVisible: is
  }),

  stockSeriesLegend(){
    return [
      AdapterFn.legendItem(0, C.S_STOCK_CLOSE, 'Close', true),
      AdapterFn.legendItem(1, C.S_HIGH, 'High'),
      AdapterFn.legendItem(2, C.S_LOW, 'Low'),
      AdapterFn.legendItem(3, C.S_OPEN, 'Open')
    ];
  },

  roundBy: mathFn.roundBy,
  numberFormat: formatAllNumber,

  isNumberOrNull: v => _isNumber(v) || v === null,

  isYNumber: _fIsNumber('y'),
  toFloatOrNull: _fToFloatOr(null),
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
      return { date: data, direction: 'empty' };
    }

    const len = data.length
          , _pointNow = len>0 && data[len-1]
               ? data[len-1]
               : [ EMPTY, 0 ]
          , _nowValue = _getValue(_pointNow)
          , bNowValue = Big(_nowValue)
          , _pointPrev = len>1 && data[len-2]
              ? data[len-2]
              : _pointNow
          , _prevValue = _getValue(_pointPrev)
          , bPrevValue = Big(_prevValue)
          , _nowDate = _getDate(_pointNow)
          , date = len>0
               ? mlsToDmy(_nowDate)
               : EMPTY
          , _prevDate = _getDate(_pointPrev)
          , dateTo = len>1 && _prevDate
               ? mlsToDmy(_prevDate)
               : EMPTY;

      return  {
        ...AdapterFn.crValueMoving({ bNowValue, bPrevValue, dfR }),
        valueTo: AdapterFn.numberFormat(bPrevValue),
        date, dateTo
      };
  },

  crId: () => {
    return (
        Date.now().toString(36) +
        Math.random().toString(36).substring(2, 9)
      )
      .toUpperCase();
  },

  crItemConf: (option) => {
    const _itemConf = {};
    let _value;
    ITEM_CONF_PROP_NAMES.forEach(k => {
      _value = option[k]
      if (_value != null) {
        _itemConf[k] = _value
      }
     })
     return _itemConf;
  },

  crValueConf: data => {
    const _p = data[data.length-1];
    return {
      y: _getValue(_p),
      x: _getDate(_p)
    };
  },

  crSeria: ({ adapter, json, option, type }) => {
    const { config } = adapter.toConfig(json, option)
    , _seria = config.series[0];
    _seria.minY = findMinY(_seria.data)
    if (type) {
      _seria.type = type
    }
    return _seria;
  },

  joinBy: (delimeter, ...restItems) => restItems
   .filter(Boolean)
   .join(delimeter),

  toUpperCaseFirst: (str) => typeof str === 'string'
    && str.length > 0
      ? str[0].toUpperCase() + str.substring(1)
      : EMPTY
  ,

  monthIndex: str => HP_MONTH[String(str).toLowerCase()]
    || -1,

  findMinY,
  findMaxY,

  crError: (errCaption='', message='') => ({
    errCaption,
    message
  }),
  crItemLink: (caption, itemUrl) => `<p>
    <a href="${itemUrl}" style="padding-top: 4px;">${caption}</a>
  </p>`
};

export default AdapterFn
