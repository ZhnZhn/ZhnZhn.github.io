"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _toYearsByMonths = _interopRequireDefault(require("../toYearsByMonths"));

var _fnAdapter = require("./fnAdapter");

var _fnUtil = require("./fnUtil");

const _isArr = Array.isArray;

const _toData = (values, times) => {
  const _values = _isArr(values) ? values : [values];

  const data = times.map((time, i) => [(0, _fnUtil.toYMD)(time), _values[i].value]);
  return data.reverse();
};

const toYearly = {
  crConfig: (json, option) => {
    const {
      title = '',
      subtitle
    } = option,
          [ds, values, times] = (0, _fnAdapter.crDsValuesTimes)(json, option),
          data = _toData(values, times),
          config = (0, _ConfigBuilder.default)().init(_toYearsByMonths.default.toConfig(data, option)).add('chart', {
      spacingTop: 25
    }).addCaption(title, subtitle).add('info', (0, _fnAdapter.crInfo)(ds, option)).add('zhConfig', (0, _fnAdapter.crZhConfig)(option)).toConfig();

    return config;
  }
};
var _default = toYearly;
exports.default = _default;
//# sourceMappingURL=toYearly.js.map