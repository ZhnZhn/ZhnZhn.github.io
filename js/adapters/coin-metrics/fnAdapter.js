"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var crError = _AdapterFn["default"].crError,
    ymdhmsToUTC = _AdapterFn["default"].ymdhmsToUTC,
    crItemConf = _AdapterFn["default"].crItemConf,
    crValueConf = _AdapterFn["default"].crValueConf;

var _crZhConfig = function _crZhConfig(option, data) {
  var _itemKey = option._itemKey,
      dataSource = option.dataSource,
      itemCaption = option.itemCaption;
  return {
    id: _itemKey,
    key: _itemKey,
    itemCaption: itemCaption,
    dataSource: dataSource,
    itemConf: (0, _extends2["default"])({
      _itemKey: _itemKey
    }, crItemConf(option), crValueConf(data), {
      dataSource: dataSource
    })
  };
};

var fnAdapter = {
  crError: crError.bind(null, "Server Response"),
  crData: function crData(json) {
    var arr = json.metricData.series;
    return arr.map(function (_ref) {
      var time = _ref.time,
          values = _ref.values;
      return [ymdhmsToUTC((time || '').replace('Z', ''), 'T'), parseFloat((values || [])[0])];
    });
  },
  crConfOption: function crConfOption(option, json, data) {
    return {
      zhConfig: _crZhConfig(option, data)
    };
  }
};
var _default = fnAdapter;
exports["default"] = _default;
//# sourceMappingURL=fnAdapter.js.map