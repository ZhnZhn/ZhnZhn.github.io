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


var _crSubtitle = function _crSubtitle(json, value) {
  var _json$ConversionType = json.ConversionType,
      ConversionType = _json$ConversionType === undefined ? {} : _json$ConversionType,
      conversionSymbol = ConversionType.conversionSymbol,
      _ConversionType$type = ConversionType.type,
      type = _ConversionType$type === undefined ? '' : _ConversionType$type;

  return value + '/' + (conversionSymbol || 'USD') + ' ' + type;
};

var toHdConfig = {
  toConfig: function toConfig(json, option) {
    var data = crData(json),
        seria = (0, _ConfigBuilder2.default)().initSpline({ data: data }).toConfig(),
        _option$value = option.value,
        value = _option$value === undefined ? '' : _option$value,
        title = option.title,
        _subtitle = _crSubtitle(json, value),
        config = (0, _ConfigBuilder2.default)().initBaseArea2().addCaption(title, _subtitle).addSeries(seria).add((0, _extends3.default)({}, crConfigOption({ option: option, data: data }))).toConfig();

    return { config: config };
  },

  toSeries: function toSeries(json, option) {
    var _toHdConfig$toConfig = toHdConfig.toConfig(json, option),
        config = _toHdConfig$toConfig.config;

    return config.series[0];
  }
};

exports.default = toHdConfig;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\crypto-compare\toHdConfig.js.map