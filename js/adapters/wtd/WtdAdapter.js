'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _ConfigBuilder = require('../../charts/ConfigBuilder');

var _ConfigBuilder2 = _interopRequireDefault(_ConfigBuilder);

var _fnAdapter = require('./fnAdapter');

var _fnAdapter2 = _interopRequireDefault(_fnAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crData = _fnAdapter2.default.crData,
    crConfigOption = _fnAdapter2.default.crConfigOption;


var WtdAdapter = {
  toConfig: function toConfig(json, option) {
    var title = option.title,
        subtitle = option.subtitle,
        value = option.value,
        dataOption = crData(json, option),
        config = (0, _ConfigBuilder2.default)().stockConfig(value, dataOption).addCaption(title, subtitle).add((0, _extends3.default)({}, crConfigOption({
      data: dataOption.data,
      option: option
    })))
    //.addZhPoints(dataMfi)
    .toConfig();

    return { config: config };
  },
  toSeries: function toSeries(json, option) {
    var _WtdAdapter$toConfig = WtdAdapter.toConfig(json, option),
        config = _WtdAdapter$toConfig.config;

    return config.series[0];
  }
};

exports.default = WtdAdapter;
//# sourceMappingURL=WtdAdapter.js.map