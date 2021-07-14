"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var crError = _AdapterFn["default"].crError,
    ymdToUTC = _AdapterFn["default"].ymdToUTC,
    crVolumePoint = _AdapterFn["default"].crVolumePoint,
    getValue = _AdapterFn["default"].getValue,
    joinBy = _AdapterFn["default"].joinBy,
    toUpperCaseFirst = _AdapterFn["default"].toUpperCaseFirst,
    crItemLink = _AdapterFn["default"].crItemLink;
var DF_ID = 'btc-bitcoin';

var getCoinId = function getCoinId(_ref) {
  var _ref$items = _ref.items,
      items = _ref$items === void 0 ? [] : _ref$items;
  return getValue(items[0], {
    dfValue: DF_ID
  });
};

var COIN_URL = 'https://coinpaprika.com/coin',
    _crCoinUrl = function _crCoinUrl(option) {
  return COIN_URL + "/" + getCoinId(option) + "/";
},
    _crInfo = function _crInfo(option) {
  return {
    name: option.title || '',
    description: crItemLink('Coinpaprika', _crCoinUrl(option))
  };
};

var fnAdapter = {
  crError: crError,
  getValue: getValue,
  joinBy: joinBy,
  toUpperCaseFirst: toUpperCaseFirst,
  getCoinId: getCoinId,
  crData: function crData(arr) {
    var data = [],
        dColumn = [],
        dVolume = [],
        dMarketCap = [];
    arr.forEach(function (item) {
      var time_close = item.time_close,
          close = item.close,
          open = item.open,
          low = item.low,
          high = item.high,
          volume = item.volume,
          market_cap = item.market_cap,
          _date = time_close ? ymdToUTC(time_close.split('T')[0]) : void 0;

      if (_date) {
        data.push([_date, close]);
        dVolume.push([_date, volume]);
        dColumn.push(crVolumePoint({
          date: _date,
          open: open,
          close: close,
          volume: volume,
          option: {
            _high: high,
            _low: low
          }
        }));
        dMarketCap.push([_date, market_cap]);
      }
    });
    return {
      data: data,
      dVolume: dVolume,
      dColumn: dColumn,
      dMarketCap: dMarketCap
    };
  },
  addConfOption: function addConfOption(option) {
    return {
      info: _crInfo(option)
    };
  }
};
var _default = fnAdapter;
exports["default"] = _default;
//# sourceMappingURL=fnAdapter.js.map