"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var crError = _AdapterFn["default"].crError,
    ymdhmsToUTC = _AdapterFn["default"].ymdhmsToUTC;

var _crZhConfig = function _crZhConfig(option) {
  var dataSource = option.dataSource,
      _itemKey = option._itemKey,
      title = option.title,
      _id = _itemKey;
  return {
    id: _id,
    key: _id,
    itemCaption: title,
    dataSource: dataSource,
    itemConf: {
      _itemKey: _id,
      dataSource: dataSource
    }
  };
};

var fnAdapter = {
  crError: crError.bind(null, "Server Response"),
  crData: function crData(json) {
    var arr = json.metricData.series,
        data = arr.map(function (item) {
      return [ymdhmsToUTC(item.time.replace('T', ' ').replace('Z', '')), parseFloat(item.values[0])];
    });
    return data;
  },
  crTitle: function crTitle(_ref) {
    var title = _ref.title,
        subtitle = _ref.subtitle;
    return {
      title: title,
      subtitle: subtitle
    };
  },
  crConfigOption: function crConfigOption(json, option) {
    return {
      zhConfig: _crZhConfig(option)
    };
  }
};
var _default = fnAdapter;
exports["default"] = _default;
//# sourceMappingURL=fnAdapter.js.map