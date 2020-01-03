"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _toYearly = _interopRequireDefault(require("../toYearly"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var _fnUtil = _interopRequireDefault(require("./fnUtil"));

var toYMD = _fnUtil["default"].toYMD;
var crDsValuesTimes = _fnAdapter["default"].crDsValuesTimes,
    crInfo = _fnAdapter["default"].crInfo,
    crZhConfig = _fnAdapter["default"].crZhConfig;

var _toData = function _toData(values, times) {
  var _values = Array.isArray(values) ? values : [values];

  var data = times.map(function (time, i) {
    return [toYMD(time), _values[i].value];
  });
  return data.reverse();
};

var toYearly = {
  crConfig: function crConfig(json, option) {
    var _option$title = option.title,
        title = _option$title === void 0 ? '' : _option$title,
        subtitle = option.subtitle,
        _crDsValuesTimes = crDsValuesTimes(json, option),
        ds = _crDsValuesTimes.ds,
        values = _crDsValuesTimes.values,
        times = _crDsValuesTimes.times,
        data = _toData(values, times),
        config = (0, _ConfigBuilder["default"])().init(_toYearly["default"].toConfig(data, option)).add('chart', {
      spacingTop: 25
    }).addCaption(title, subtitle).add('info', crInfo(ds, option)).add('zhConfig', crZhConfig(option)).toConfig();

    return config;
  }
};
var _default = toYearly;
exports["default"] = _default;
//# sourceMappingURL=toYearly.js.map