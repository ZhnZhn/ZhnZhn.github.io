"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _DateUtils = _interopRequireDefault(require("../../utils/DateUtils"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var getUTCTime = _DateUtils["default"].getUTCTime;
var numberFormat = _AdapterFn["default"].numberFormat;
var HEADERS = [{
  name: 'Rank',
  pn: 'rank',
  isToN: true,
  style: {
    textAlign: 'center'
  }
}, {
  name: 'Coin',
  pn: 'symbol',
  isHref: true
}, {
  name: 'MarketCap',
  pn: 'market_cap_usd',
  isToN: true,
  isF: true,
  style: {
    fontWeight: 'bold'
  }
}, {
  name: '1h %',
  pn: 'percent_change_1h',
  isToN: true,
  isR: true
}, {
  name: '24h %',
  pn: 'percent_change_24h',
  isToN: true,
  isR: true
}, {
  name: '24h Vol.',
  pn: '24h_volume_usd',
  isToN: true,
  isToFixed: true,
  isR: true,
  isF: true,
  style: {
    textAlign: 'right'
  }
}, {
  name: '7d %',
  pn: 'percent_change_7d',
  isToN: true,
  isR: true
}];

var _getCellValue = function _getCellValue(r, h) {
  var pn = h.pn,
      isToN = h.isToN,
      isToFixed = h.isToFixed;
  return isToN ? isToFixed ? parseFloat(parseFloat(r[pn]).toFixed(0)) : parseFloat(r[pn]) : r[pn];
};

var _toRows = function _toRows(headers, rows) {
  if (headers === void 0) {
    headers = [];
  }

  if (rows === void 0) {
    rows = [];
  }

  var _rows = [].concat(rows).map(function (r) {
    headers.forEach(function (h) {
      r[h.pn] = _getCellValue(r, h);
    });
    return r;
  });

  return _rows;
};

var _crUpdatedTime = function _crUpdatedTime(json) {
  var _seconds = json.map(function (coin) {
    return coin.last_updated;
  }),
      _minMs = Math.max.apply(Math, _seconds) * 1000,
      _maxMs = Math.min.apply(Math, _seconds) * 1000,
      _fromTime = getUTCTime(_minMs),
      _toTime = getUTCTime(_maxMs);

  return _fromTime !== _toTime ? _fromTime + " - " + _toTime : _fromTime;
};

var _crTitle = function _crTitle(_ref, json) {
  var one = _ref.one,
      two = _ref.two;

  var _two = parseFloat(two) - 1,
      _one = parseFloat(one) + 1,
      _updatedTime = _crUpdatedTime(json);

  return _one + " - " + (_one + _two) + ": Values in USD: Updated " + _updatedTime + " UTC";
};

var BASE_URL = 'https://coinmarketcap.com/currencies/';

var valueToHref = function valueToHref(id) {
  return "" + BASE_URL + id;
};

var CmcAdapter = {
  toConfig: function toConfig(json, option) {
    var one = option.one,
        two = option.two,
        _id = one + "_" + two,
        config = {
      id: _id,
      title: _crTitle(option, json),
      headers: HEADERS,
      tableFn: {
        numberFormat: numberFormat,
        valueToHref: valueToHref
      },
      rows: _toRows(HEADERS, json),
      zhCompType: 'TABLE',
      zhConfig: {
        id: _id,
        key: _id
      }
    };

    return {
      config: config
    };
  },
  toSeries: function toSeries(json, option) {
    throw new Error('ZH_1000');
  }
};
var _default = CmcAdapter;
exports["default"] = _default;
//# sourceMappingURL=CmcAdapter.js.map