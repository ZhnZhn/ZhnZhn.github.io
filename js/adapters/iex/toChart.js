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
  var one = option.one,
      two = option.two,
      dataSource = option.dataSource;
  return {
    dataSource: dataSource,
    id: id,
    key: id,
    linkFn: "NASDAQ",
    item: one,
    itemCaption: one,
    itemConf: (0, _extends2["default"])({}, crItemConf(option), crValueConf(data), {
      _itemKey: id,
      symbol: one,
      dfPeriod: two,
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
  crId: function crId(_ref) {
    var _itemKey = _ref._itemKey,
        one = _ref.one,
        two = _ref.two;
    return _itemKey || one + '_' + two;
  },
  crAddConfig: function crAddConfig(_ref2) {
    var title = _ref2.title,
        option = _ref2.option,
        id = _ref2.id,
        data = _ref2.data;
    return {
      info: _crInfo(title),
      zhConfig: _crZhConfig(id, option, data)
    };
  }
});
var _default = toChart;
exports["default"] = _default;
//# sourceMappingURL=toChart.js.map