'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ConfigBuilder = require('../../charts/ConfigBuilder');

var _ConfigBuilder2 = _interopRequireDefault(_ConfigBuilder);

var _IndicatorSma = require('../IndicatorSma');

var _fnAdapter = require('./fnAdapter');

var _fnAdapter2 = _interopRequireDefault(_fnAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crData = _fnAdapter2.default.crData,
    crZhConfig = _fnAdapter2.default.crZhConfig,
    crValueMoving = _fnAdapter2.default.crValueMoving,
    crInfo = _fnAdapter2.default.crInfo;


var IntrinioAdapter = {
  toConfig: function toConfig(json, option) {
    var data = crData(json, option),
        seria = (0, _ConfigBuilder2.default)().initSpline({ data: data }).toConfig(),
        title = option.title,
        subtitle = option.subtitle,
        config = (0, _ConfigBuilder2.default)().initBaseArea().add('chart', { spacingTop: 25 }).addCaption(title, subtitle).clearSeries().addSeries(seria).add({
      zhConfig: crZhConfig(option),
      valueMoving: crValueMoving(data),
      info: crInfo(option),
      zhFnAddSeriesSma: _IndicatorSma.fnAddSeriesSma,
      zhFnRemoveSeries: _IndicatorSma.fnRemoveSeries
    }).toConfig();


    return { config: config };
  },
  toSeries: function toSeries(json, option) {
    var _IntrinioAdapter$toCo = IntrinioAdapter.toConfig(json, option),
        config = _IntrinioAdapter$toCo.config;

    return config.series[0];
  }
};

exports.default = IntrinioAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\intrinio\IntrinioAdapter.js.map