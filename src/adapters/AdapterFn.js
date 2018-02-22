
import Big from 'big.js';

import DateUtils from '../utils/DateUtils';
import ChartConfig from '../charts/ChartConfig';
import { Direction } from '../constants/Type';

import mathFn from '../math/mathFn';

import C from '../constants/Color';

import {
  fnAddSeriesSma, fnRemoveSeries,
  fnGetConfigMfi
       } from './IndicatorSma';

const EMPTY = '';
const M = ['january', 'february',
  'march', 'april', 'may',
  'june', 'july', 'august',
  'september', 'october', 'november',
  'december'
];

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

const _getDate = (point) => {
  return Array.isArray(point)
    ? point[0]
    : point.x;
}
const _getValue = (point) => {
  if (Array.isArray(point)){
    return point[1] != null
       ? point[1]
       : '0.0';
  } else {
    return point && point.y != null
       ? point.y
       : '0.0';
  }
}

const AdapterFn = {
  ymdToUTC(date) {
    const _arr = date.split('-')
        , _len = _arr.length;
    if (_len === 3) {
      return Date.UTC( _arr[0], (parseInt(_arr[1], 10)-1), _arr[2] );
    } else if ( _len === 2 && _arr[1] !== ''){
      const _m = parseInt(_arr[1], 10)
          , _d = (new Date(_arr[0], _m, 0)).getDate();
      return Date.UTC( _arr[0], _m - 1, _d );
    } else if ( _len === 1) {
      return Date.UTC( _arr[0], 11, 31 );
    }
  },
  ymdtToUTC(date) {
    const _arr = date.split('-')
        , _d = _arr[2].split(' ')[0];
    return Date.UTC(
      _arr[0], (parseInt(_arr[1], 10)-1), _d
    );
  },
  ymdhmsToUTC(date) {
    const _dtArr = date.split(' ')
    , _ymdArr = _dtArr[0].split('-')
    , _hmsArr = _dtArr[1].split(':');
    return Date.UTC(
      _ymdArr[0], (parseInt(_ymdArr[1], 10)-1), _ymdArr[2],
      _hmsArr[0], _hmsArr[1], _hmsArr[2]
    );
  },

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

  legendItem(index, color, name, is=false){
    return {
      index, color, name,
      isVisible: is
    };
  },

  stockSeriesLegend(){
    return [
      AdapterFn.legendItem(0, C.S_STOCK_CLOSE, 'Close', true),
      AdapterFn.legendItem(1, C.S_HIGH, 'High'),
      AdapterFn.legendItem(2, C.S_LOW, 'Low'),
      AdapterFn.legendItem(3, C.S_OPEN, 'Open')
    ];
  },

  numberFormat(value){
    return ChartConfig.fnNumberFormat(value);
  },

  isNumberOrNull: v => {
     return (typeof v === 'number' && !isNaN(v))
       || v === null;
  },

  compareByDate: _compareArrByIndex(0),
  compareByY: _compareArrByIndex('y'),
  compareByValue: _compareArrByIndex('value'),
  compareByValueId: _compareByTwoProp('value', 'id'),

  crValueMoving({ bNowValue=Big('0.0'), bPrevValue=Big('0.0') }){
    return mathFn.crValueMoving({
      nowValue: bNowValue,
      prevValue: bPrevValue,
      Direction: Direction,
      fnFormat: ChartConfig.fnNumberFormat
    })
  },

  valueMoving(data){
    if (!Array.isArray(data)) {
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
               ? DateUtils.formatTo(_nowDate)
               : EMPTY
          , _prevDate = _getDate(_pointPrev)
          , dateTo = len>1 && _prevDate
               ? DateUtils.formatTo(_prevDate)
               : EMPTY;

      return  {
        ...AdapterFn.crValueMoving({ bNowValue, bPrevValue }),
        valueTo: AdapterFn.numberFormat(bPrevValue),
        date, dateTo
      };
  },

  crId: () => {
    return (
        Date.now().toString(36) +
        Math.random().toString(36).substr(2, 9)
      )
      .toUpperCase();
  },

  crZhFn: () => ({
    zhFnAddSeriesSma: fnAddSeriesSma,
    zhFnRemoveSeries: fnRemoveSeries
  }),
  fnGetConfigMfi: fnGetConfigMfi,

  toUpperCaseFirst: (str) => {
    return (typeof str === 'string' || str instanceof String ) && str.length > 0
         ? str[0].toUpperCase() + str.substr(1)
         : EMPTY;
  },

  monthIndex: (str) => {
    return M.indexOf(
      String(str).toLowerCase()
    );
  }

}

export default AdapterFn
