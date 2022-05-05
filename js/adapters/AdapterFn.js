"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _dateFormat = require("../charts/dateFormat");

var _arrFn = require("../utils/arrFn");

var _fCompareBy = _interopRequireDefault(require("../utils/fCompareBy"));

var _fCompareByTwoProps = _interopRequireDefault(require("../utils/fCompareByTwoProps"));

var _formatAllNumber = _interopRequireDefault(require("../utils/formatAllNumber"));

var _getPropertyFn = require("../utils/getPropertyFn");

var _DateUtils = require("../utils/DateUtils");

var _toUpperCaseFirst = _interopRequireDefault(require("../utils/toUpperCaseFirst"));

var _mathFn = require("../math/mathFn");

var _seriaFn = require("../math/seriaFn");

var _Type = require("../constants/Type");

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

const _crDmyFrom = point => (0, _DateUtils.mlsToDmy)(_getDate(point));

const _fToFloatOr = dfValue => str => {
  const _v = parseFloat(str);

  return _isNaN(_v) ? dfValue : _v;
};

const AdapterFn = {
  toTd: mls => _isNumber(mls) ? (0, _dateFormat.toTd)(mls) : '',
  ymdToUTC: _DateUtils.ymdToUTC,
  ymdhmsToUTC: _DateUtils.ymdhmsToUTC,
  getFromDate: _DateUtils.getFromDate,
  getYmdhmUTC: _DateUtils.getYmdhmUTC,
  getYear: _DateUtils.getYear,
  getCurrentYear: _DateUtils.getCurrentYear,
  monthIndex: _DateUtils.monthIndex,
  getCaption: _getPropertyFn.getC,
  getValue: _getPropertyFn.getV,
  isInArrStr: _arrFn.isInArrStr,
  roundBy: _mathFn.roundBy,
  numberFormat: _formatAllNumber.default,
  isNumberOrNull: v => _isNumber(v) || v === null,
  isYNumber: _fIsNumber('y'),
  toFloatOrEmpty: _fToFloatOr(''),
  compareByDate: (0, _fCompareBy.default)(0),
  compareByY: (0, _fCompareBy.default)('y'),
  compareByValue: (0, _fCompareBy.default)('value'),
  compareByValueId: (0, _fCompareByTwoProps.default)('value', 'id'),
  crValueMoving: _ref => {
    let {
      bNowValue = (0, _big.default)('0.0'),
      bPrevValue = (0, _big.default)('0.0'),
      dfR
    } = _ref;
    return (0, _mathFn.crValueMoving)({
      nowValue: bNowValue,
      prevValue: bPrevValue,
      fnFormat: _formatAllNumber.default,
      dfR
    });
  },

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
      valueTo: (0, _formatAllNumber.default)(bPrevValue),
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
  joinBy: function (delimeter) {
    for (var _len = arguments.length, restItems = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      restItems[_key - 1] = arguments[_key];
    }

    return restItems.filter(Boolean).join(delimeter);
  },
  toUpperCaseFirst: _toUpperCaseFirst.default,
  findMinY: _seriaFn.findMinY,
  findMaxY: _seriaFn.findMaxY,
  filterTrimZero: _seriaFn.filterTrimZero,
  mapIf: (arr, crItem, is) => {
    const _items = [];
    (arr || []).forEach(v => {
      if (is(v)) {
        _items.push(crItem(v));
      }
    });
    return _items;
  },
  crZhConfig: _ref2 => {
    let {
      _itemKey,
      itemCaption,
      dataSource
    } = _ref2;
    return {
      id: _itemKey,
      key: _itemKey,
      itemCaption,
      dataSource
    };
  }
};
var _default = AdapterFn;
exports.default = _default;
//# sourceMappingURL=AdapterFn.js.map