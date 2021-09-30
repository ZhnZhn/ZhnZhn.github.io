"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _dateFormat = _interopRequireDefault(require("../charts/dateFormat"));

var _ut = _interopRequireDefault(require("../utils/ut"));

var _mathFn = _interopRequireDefault(require("../math/mathFn"));

var _seriaFn = _interopRequireDefault(require("../math/seriaFn"));

var _Type = require("../constants/Type");

var _crFn = _interopRequireDefault(require("./crFn"));

var _pointFn = _interopRequireDefault(require("./pointFn"));

var _legendFn = _interopRequireDefault(require("./legendFn"));

const {
  toTd
} = _dateFormat.default;
const {
  isInArrStr,
  dt,
  fCompareBy,
  fCompareByTwoProps,
  getC,
  getV,
  formatAllNumber
} = _ut.default,
      {
  findMinY,
  findMaxY,
  filterTrimZero
} = _seriaFn.default;
const {
  ymdToUTC,
  ymdhmsToUTC,
  mlsToDmy,
  getFromDate,
  getYmdhmUTC,
  getYear,
  getCurrentYear,
  monthIndex
} = dt;
const EMPTY = '';
const ITEM_CONF_PROP_NAMES = ['url', 'loadId', 'title', 'subtitle', 'itemCaption', 'seriaType', 'items'];

const _isNaN = Number.isNaN,
      _isArr = Array.isArray,
      _isNumber = n => typeof n === 'number' && n - n === 0;

const _fIsNumber = pn => p => {
  return typeof p[pn] === 'number' && isFinite(p[pn]);
};

const _getDate = point => _isArr(point) ? point[0] : (point || {}).x;

const _getValue = point => _isArr(point) ? _isNumber(point[1]) ? point[1] : '0.0' : point && _isNumber(point.y) ? point.y : '0.0';

const _crBigValueFrom = point => (0, _big.default)(_getValue(point));

const _crDmyFrom = point => mlsToDmy(_getDate(point));

const _fToFloatOr = dfValue => str => {
  const _v = parseFloat(str);

  return _isNaN(_v) ? dfValue : _v;
};

const AdapterFn = { ..._crFn.default,
  ..._pointFn.default,
  ..._legendFn.default,
  toTd: mls => _isNumber(mls) ? toTd(mls) : '',
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
  roundBy: _mathFn.default.roundBy,
  numberFormat: formatAllNumber,
  isNumberOrNull: v => _isNumber(v) || v === null,
  isYNumber: _fIsNumber('y'),
  toFloatOrEmpty: _fToFloatOr(''),
  compareByDate: fCompareBy(0),
  compareByY: fCompareBy('y'),
  compareByValue: fCompareBy('value'),
  compareByValueId: fCompareByTwoProps('value', 'id'),
  crValueMoving: ({
    bNowValue = (0, _big.default)('0.0'),
    bPrevValue = (0, _big.default)('0.0'),
    dfR
  }) => _mathFn.default.crValueMoving({
    nowValue: bNowValue,
    prevValue: bPrevValue,
    fnFormat: formatAllNumber,
    dfR
  }),

  valueMoving(data, dfR) {
    if (!_isArr(data)) {
      return {
        date: data,
        direction: _Type.Direction.EMPTY
      };
    }

    const len = data.length,
          _pointNow = data[len - 1] || [EMPTY, 0],
          bNowValue = _crBigValueFrom(_pointNow),
          _pointPrev = data[len - 2] || _pointNow,
          bPrevValue = _crBigValueFrom(_pointPrev),
          date = _crDmyFrom(_pointNow),
          dateTo = _crDmyFrom(_pointPrev);

    return { ...AdapterFn.crValueMoving({
        bNowValue,
        bPrevValue,
        dfR
      }),
      valueTo: formatAllNumber(bPrevValue),
      date,
      dateTo
    };
  },

  crItemConf: option => {
    const _itemConf = {};

    let _value;

    ITEM_CONF_PROP_NAMES.forEach(k => {
      _value = option[k];

      if (_value != null) {
        _itemConf[k] = _isArr(_value) ? _value.map(obj => ({ ...obj
        })) : _value;
      }
    });
    return _itemConf;
  },
  crValueConf: data => {
    const _p = data[data.length - 1];
    return {
      x: _getDate(_p),
      y: _getValue(_p)
    };
  },
  joinBy: (delimeter, ...restItems) => restItems.filter(Boolean).join(delimeter),
  toUpperCaseFirst: str => typeof str === 'string' && str.length > 0 ? str[0].toUpperCase() + str.substring(1) : EMPTY,
  findMinY,
  findMaxY,
  filterTrimZero,
  mapIf: (arr, crItem, is) => {
    const _items = [];
    (arr || []).forEach(v => {
      if (is(v)) {
        _items.push(crItem(v));
      }
    });
    return _items;
  },
  crZhConfig: ({
    _itemKey,
    itemCaption,
    dataSource
  }) => ({
    id: _itemKey,
    key: _itemKey,
    itemCaption,
    dataSource
  })
};
var _default = AdapterFn;
exports.default = _default;
//# sourceMappingURL=AdapterFn.js.map