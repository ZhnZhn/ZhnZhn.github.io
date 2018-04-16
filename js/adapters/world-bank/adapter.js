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

var crId = _fnAdapter2.default.crId,
    crData = _fnAdapter2.default.crData,
    crConfigOptions = _fnAdapter2.default.crConfigOptions;


var adapter = {
  crKey: crId,

  toConfig: function toConfig(json, option) {
    var title = option.title,
        subtitle = option.subtitle,
        data = crData(json[1]),
        seria = (0, _ConfigBuilder2.default)().initSpline({ data: data }).toConfig(),
        config = (0, _ConfigBuilder2.default)().initBaseArea().add('chart', { spacingTop: 25 }).addCaption(title, subtitle).addSeries(seria).add((0, _extends3.default)({}, crConfigOptions(option, data))).toConfig();


    return { config: config };
  },
  toSeries: function toSeries(json, option) {
    var _adapter$toConfig = adapter.toConfig(json, option),
        config = _adapter$toConfig.config;

    return config.series[0];
  }
};

exports.default = adapter;
//# sourceMappingURL=adapter.js.map