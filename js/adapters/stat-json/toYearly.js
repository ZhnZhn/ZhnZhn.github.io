"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _toYearsByMonths = _interopRequireDefault(require("../toYearsByMonths"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var _fnUtil = require("./fnUtil");

const _isArr = Array.isArray,
      {
  crDsValuesTimes,
  crInfo,
  crZhConfig
} = _fnAdapter.default;

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
          [ds, values, times] = crDsValuesTimes(json, option),
          data = _toData(values, times),
          config = (0, _ConfigBuilder.default)().init(_toYearsByMonths.default.toConfig(data, option)).add('chart', {
      spacingTop: 25
    }).addCaption(title, subtitle).add('info', crInfo(ds, option)).add('zhConfig', crZhConfig(option)).toConfig();

    return config;
  }
};
var _default = toYearly;
exports.default = _default;
//# sourceMappingURL=toYearly.js.map