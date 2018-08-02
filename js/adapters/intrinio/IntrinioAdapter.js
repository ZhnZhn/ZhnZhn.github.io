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

var crSubtitle = _fnAdapter2.default.crSubtitle,
    crData = _fnAdapter2.default.crData,
    crConfigOption = _fnAdapter2.default.crConfigOption;


var IntrinioAdapter = {
  toConfig: function toConfig(json, option) {
    var data = crData(json, option),
        seria = (0, _ConfigBuilder2.default)().splineSeria({ data: data }).toSeria(),
        _subtitle = crSubtitle(option),
        title = option.title,
        config = (0, _ConfigBuilder2.default)().area2Config(title, _subtitle).addSeries(seria).add((0, _extends3.default)({}, crConfigOption({ option: option, data: data }))).toConfig();


    return { config: config };
  },
  toSeries: function toSeries(json, option) {
    var _IntrinioAdapter$toCo = IntrinioAdapter.toConfig(json, option),
        config = _IntrinioAdapter$toCo.config;

    return config.series[0];
  }
};

exports.default = IntrinioAdapter;
//# sourceMappingURL=IntrinioAdapter.js.map