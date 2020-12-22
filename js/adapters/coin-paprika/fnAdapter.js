"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var ymdToUTC = _AdapterFn["default"].ymdToUTC,
    crVolumePoint = _AdapterFn["default"].crVolumePoint,
    getValue = _AdapterFn["default"].getValue,
    joinBy = _AdapterFn["default"].joinBy,
    toUpperCaseFirst = _AdapterFn["default"].toUpperCaseFirst;

var _crInfo = function _crInfo(_ref) {
  var title = _ref.title;
  return {
    name: title
  };
};

var fnAdapter = {
  getValue: getValue,
  joinBy: joinBy,
  toUpperCaseFirst: toUpperCaseFirst,
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