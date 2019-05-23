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


var DF_PAIR = 'USD';
var V_ON_TIME = 'Values on 00:00 GMT';

var _crTitle = function _crTitle(title) {
  return title + ': ' + V_ON_TIME;
};

var _crSubtitle = function _crSubtitle(json, value) {
  var _json$ConversionType = json.ConversionType,
      ConversionType = _json$ConversionType === undefined ? {} : _json$ConversionType,
      conversionSymbol = ConversionType.conversionSymbol,
      _ConversionType$type = ConversionType.type,
      type = _ConversionType$type === undefined ? '' : _ConversionType$type;

  return value + '/' + (conversionSymbol || DF_PAIR) + ' ' + type;
};

var _crBtTitleTo = function _crBtTitleTo(json) {
  var _json$ConversionType2 = json.ConversionType,
      ConversionType = _json$ConversionType2 === undefined ? {} : _json$ConversionType2,
      conversionSymbol = ConversionType.conversionSymbol;

  return '' + (conversionSymbol || DF_PAIR);
};

var toHdConfig = {
  toConfig: function toConfig(json, option) {
    var _crData = crData(json),
        data = _crData.data,
        dVolume = _crData.dVolume,
        dColumn = _crData.dColumn,
        dToVolume = _crData.dToVolume,
        dHL = _crData.dHL,
        seria = (0, _ConfigBuilder2.default)().splineSeria({ data: data }).toSeria(),
        _option$value = option.value,
        value = _option$value === undefined ? '' : _option$value,
        title = option.title,
        _title = _crTitle(title),
        _subtitle = _crSubtitle(json, value),
        _btTitleTo = _crBtTitleTo(json),
        config = (0, _ConfigBuilder2.default)().area2Config(_title, _subtitle).addSeries(seria).checkThreshold().addMinMax(data, option).add((0, _extends3.default)({}, crConfigOption({ option: option, data: data }))).addMiniVolume({
      btTitle: 'Volume ' + value,
      title: value,
      dColumn: dColumn, dVolume: dVolume
    }).addMiniVolume({
      btTitle: 'Volume ' + _btTitleTo,
      title: _btTitleTo,
      dVolume: dToVolume,
      dColumn: []
    }).addMiniHL({ data: dHL }).toConfig();

    return { config: config };
  },

  toSeries: function toSeries(json, option) {
    var _toHdConfig$toConfig = toHdConfig.toConfig(json, option),
        config = _toHdConfig$toConfig.config;

    return config.series[0];
  }
};

exports.default = toHdConfig;
//# sourceMappingURL=toHdConfig.js.map