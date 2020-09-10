"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crConfigType = _interopRequireDefault(require("../../charts/crConfigType1"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var Builder = _crConfigType["default"].Builder,
    crData = _fnAdapter["default"].crData,
    crConfigOption = _fnAdapter["default"].crConfigOption,
    _assign = Object.assign;
var DF_PAIR = 'USD';
var V_ON_TIME = 'Values on 00:00 GMT';

var _crTitle = function _crTitle(title) {
  return title + ": " + V_ON_TIME;
};

var _crSubtitle = function _crSubtitle(json, value) {
  var _json$ConversionType = json.ConversionType,
      ConversionType = _json$ConversionType === void 0 ? {} : _json$ConversionType,
      conversionSymbol = ConversionType.conversionSymbol,
      _ConversionType$type = ConversionType.type,
      type = _ConversionType$type === void 0 ? '' : _ConversionType$type;
  return value + "/" + (conversionSymbol || DF_PAIR) + " " + type;
};

var _crBtTitleTo = function _crBtTitleTo(json) {
  var _json$ConversionType2 = json.ConversionType,
      ConversionType = _json$ConversionType2 === void 0 ? {} : _json$ConversionType2,
      conversionSymbol = ConversionType.conversionSymbol;
  return "" + (conversionSymbol || DF_PAIR);
};

var toHdConfig = {
  toConfig: function toConfig(json, option) {
    var _option$value = option.value,
        value = _option$value === void 0 ? '' : _option$value,
        title = option.title;

    _assign(option, {
      itemCaption: title,
      title: _crTitle(title),
      subtitle: _crSubtitle(json, value)
    });

    var _crData = crData(json),
        data = _crData.data,
        dVolume = _crData.dVolume,
        dColumn = _crData.dColumn,
        dToVolume = _crData.dToVolume,
        dHL = _crData.dHL,
        _btTitleTo = _crBtTitleTo(json),
        confOption = crConfigOption(option),
        config = Builder((0, _crConfigType["default"])({
      option: option,
      data: data,
      confOption: confOption
    })).addMiniVolume({
      btTitle: 'Volume ' + value,
      dColumn: dColumn,
      dVolume: dVolume
    }).addMiniVolume({
      btTitle: 'Volume ' + _btTitleTo,
      dVolume: dToVolume,
      dColumn: []
    }).addMiniHL({
      data: dHL
    }).toConfig();

    return {
      config: config
    };
  },
  toSeries: function toSeries(json, option) {
    return Builder.crSeria({
      adapter: toHdConfig,
      json: json,
      option: option
    });
  }
};
var _default = toHdConfig;
exports["default"] = _default;
//# sourceMappingURL=toHdConfig.js.map