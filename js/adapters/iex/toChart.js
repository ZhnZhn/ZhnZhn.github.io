"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _crAdapterOHLCV = _interopRequireDefault(require("../crAdapterOHLCV"));

var crItemConf = _AdapterFn["default"].crItemConf,
    crValueConf = _AdapterFn["default"].crValueConf;

var _crZhConfig = function _crZhConfig(id, option, data) {
  var symbol = option.symbol,
      period = option.period,
      dataSource = option.dataSource;
  return {
    dataSource: dataSource,
    id: id,
    key: id,
    linkFn: "NASDAQ",
    item: symbol,
    itemCaption: symbol,
    itemConf: (0, _extends2["default"])({}, crItemConf(option), crValueConf(data), {
      _itemKey: id,
      items: [{
        "v": symbol
      }, {
        "v": period
      }],
      dataSource: dataSource
    })
  };
};

var _crInfo = function _crInfo(title) {
  return {
    name: title,
    frequency: "Daily"
  };
};

var toChart = (0, _crAdapterOHLCV["default"])({
  crAddConfig: function crAddConfig(_ref) {
    var title = _ref.title,
        option = _ref.option,
        id = _ref.id,
        data = _ref.data;
    return {
      info: _crInfo(title),
      zhConfig: _crZhConfig(id, option, data)
    };
  }
});
var _default = toChart;
exports["default"] = _default;
//# sourceMappingURL=toChart.js.map