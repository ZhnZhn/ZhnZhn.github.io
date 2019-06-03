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

var crCaption = _fnAdapter2.default.crCaption,
    crSeriaType = _fnAdapter2.default.crSeriaType,
    crData = _fnAdapter2.default.crData,
    crConfigOption = _fnAdapter2.default.crConfigOption;


var FmpAdapter = {
  toConfig: function toConfig(json, option) {
    var _propName = option._propName,
        seriaType = option.seriaType,
        seriaColor = option.seriaColor,
        _crCaption = crCaption(option),
        title = _crCaption.title,
        subtitle = _crCaption.subtitle,
        data = crData(json._values, _propName),
        seria = (0, _ConfigBuilder2.default)().splineSeria({
      type: crSeriaType(seriaType),
      color: seriaColor,
      data: data
    }).toSeria(),
        config = (0, _ConfigBuilder2.default)().area2Config(title, subtitle).addSeries(seria).addMinMax(data, option).add((0, _extends3.default)({}, crConfigOption({ json: json, option: option, data: data }))).toConfig();

    return { config: config };
  },
  toSeries: function toSeries(json, option) {
    var _FmpAdapter$toConfig = FmpAdapter.toConfig(json, option),
        config = _FmpAdapter$toConfig.config;

    return config.series[0];
  }
};

exports.default = FmpAdapter;
//# sourceMappingURL=FmpAdapter.js.map