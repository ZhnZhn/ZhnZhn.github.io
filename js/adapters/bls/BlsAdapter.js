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


var BlsAdapter = {
  toConfig: function toConfig(json, option) {
    var dfTitle = option.dfTitle,
        subtitle = option.subtitle,
        title = option.title,
        _dfTitle = dfTitle || subtitle,
        data = crData(json),
        seria = (0, _ConfigBuilder2.default)().splineSeria({ data: data }).toSeria(),
        config = (0, _ConfigBuilder2.default)().area2Config(_dfTitle, title).addSeries(seria).add((0, _extends3.default)({}, crConfigOption({ json: json, option: option, data: data }))).toConfig();

    return { config: config };
  },
  toSeries: function toSeries(json, option) {
    var _BlsAdapter$toConfig = BlsAdapter.toConfig(json, option),
        config = _BlsAdapter$toConfig.config;

    return config.series[0];
  }
};

exports.default = BlsAdapter;
//# sourceMappingURL=BlsAdapter.js.map