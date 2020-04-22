
import Big from 'big.js';

import dt from '../utils/DateUtils';
import formatAllNumber from '../utils/formatAllNumber'

import { Direction } from '../constants/Type';

import mathFn from '../math/mathFn';
import seriaFns from '../math/seriaFn'

import C from '../constants/Color';

const {
  ymdToUTC,
  ymdtToUTC,
  ymdhmsToUTC,
  mlsToDmy
} = dt;

const EMPTY = '';
const M = ['january', 'february',
  'march', 'april', 'may',
  'june', 'july', 'august',
  'september', 'october', 'november',
  'december'
];

const ITEM_CONF_PROP_NAMES = [
 'url', 'loadId',
 'title', 'subtitle', 'itemCaption',
 'seriaType'
];

const _isNaN = Number && Number.isNaN || isNaN;
const _isArr = Array.isArray;
const _fIsNumber = (pn) => (p) => {
  return typeof p[pn] === 'number'
    && isFinite(p[pn]);
}
const _isFn = fn => typeof fn === 'function';

const _compareArrByIndex = index => (arrA, arrB) => {
  if (arrA[index] < arrB[index]) return -1;
  else if (arrA[index] === arrB[index]) return 0;
  else return 1;
}
const _compareByTwoProp = (propName1, propName2) => (a, b) => {
  if (a[propName1] < b[propName1]) return -1;
  else if (a[propName1] > b[propName1]) return 1;
  else if (a[propName2] < b[propName2]) return -1;
  else if (a[propName2] > a[propName2]) return 1;
  else return 0;
}

const _getDate = point =>_isArr(point)
  ? point[0]
  : point.x;

const _getValue = (point) => {
  if (_isArr(point)){
    return point[1] != null
       ? point[1]
       : '0.0';
  } else {
    return point
      && point.y != null
      && !_isNaN(point.y)
        ? point.y
        : '0.0';
  }
}

const _fToFloatOr = dfValue => str => {
  const _v = parseFloat(str);
  return _isNaN(_v) ? dfValue : _v;
};

const AdapterFn = {
  ymdToUTC,
  ymdtToUTC,
  ymdhmsToUTC,

  volumeColumnPoint({ date, open, close, volume, option }) {
    let _color;
    if (open && close > open) {
      _color = C.GREEN
    } else if (open && close<open) {
      _color = C.RED
    } else {
      _color = C.GRAY
    }

    return Object.assign({
      x: date, y: volume, color: _color,
      _open: open, _close: close
    }, option);
  },

  athPoint({ date, prevClose, open }) {
    const _bDelta = (open && prevClose)
             ? Big(prevClose).minus(open)
             : Big('0.0')
        , _bPercent = (prevClose)
             ? _bDelta.times(100).div(prevClose).abs().toFixed(2)
             : Big('0.0');

    let _color;
    if (_bDelta.gt(0.0)){
      _color = C.RED;
    }
    else if (!_bDelta.gte(0.0)){
      _color = C.GREEN;
    } else {
      _color = (open) ? C.GRAY : C.WHITE;
    }

    return {
      x : date,
      y : parseFloat(_bPercent),
      close : prevClose,
      open : open ? open : 'Unknown',
      color : _color
    };
  },

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

  formatAllNumber: formatAllNumber,
  numberFormat: formatAllNumber,

  isNumberOrNull: v => (typeof v === 'number' && !isNaN(v))
     || v === null
  ,
  isYNumber: _fIsNumber('y'),
  toFloatOrNull: _fToFloatOr(null),
  toFloatOrEmpty: _fToFloatOr(''),

  compareByDate: _compareArrByIndex(0),
  compareByY: _compareArrByIndex('y'),
  compareByValue: _compareArrByIndex('value'),
  compareByValueId: _compareByTwoProp('value', 'id'),

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

  joinBy: (delimeter, ...restItems) => restItems
   .filter(Boolean)
   .join(delimeter),

  toUpperCaseFirst: (str) => typeof str === 'string'
    && str.length > 0
      ? str[0].toUpperCase() + str.substring(1)
      : EMPTY
  ,
  appendWithColon: (...args) => {
    let str='';
    args.forEach(s => {
      if (s) {
        str = str ? `${str}: ${s}` : s
      }
    })
    return str;
  },

  monthIndex: str => M.indexOf(
    String(str).toLowerCase()
  ),

  findMinY: seriaFns.findMinY,
  findMaxY: seriaFns.findMaxY,


  crError: (errCaption='', message='') => ({
    errCaption,
    message
  }),
  crItemLink: (caption, itemUrl) => `<p>
    <a href="${itemUrl}" style="padding-top: 4px;">${caption}</a>
  </p>`,

  throwIfSeriesNotSupported: adapter => {
    if (!_isFn(adapter.toSeries)) {
      throw ({
        errCaption: "Action Error",
        message: "Load to series for this type isn't supported."
      });
    }
  }
};

export default AdapterFn
