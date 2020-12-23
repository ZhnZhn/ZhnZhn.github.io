"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var crData = _fnAdapter["default"].crData,
    crConfOption = _fnAdapter["default"].crConfOption,
    _assign = Object.assign;
var DF_PAIR = 'USD';
var V_ON_TIME = 'Values on 00:00 GMT';

var _crTitle = function _crTitle(title) {
  return title + ": " + V_ON_TIME;
};

var _getConversionType = function _getConversionType(_ref) {
  var ConversionType = _ref.ConversionType;
  return ConversionType || {};
};

var _crSubtitle = function _crSubtitle(json, value) {
  var ConversionType = _getConversionType(json),
      conversionSymbol = ConversionType.conversionSymbol,
      _ConversionType$type = ConversionType.type,
      type = _ConversionType$type === void 0 ? '' : _ConversionType$type;

  return value + "/" + (conversionSymbol || DF_PAIR) + " " + type;
};

var _crBtTitleTo = function _crBtTitleTo(json) {
  var ConversionType = _getConversionType(json),
      conversionSymbol = ConversionType.conversionSymbol;

  return "" + (conversionSymbol || DF_PAIR);
};

var _crMiniVolume = function _crMiniVolume(title, dColumn, dVolume) {
  return {
    btTitle: "Volume " + title,
    dColumn: dColumn,
    dVolume: dVolume
  };
};

var trOption = function trOption(option, json) {
  var _option$value = option.value,
      value = _option$value === void 0 ? '' : _option$value,
      title = option.title;

  _assign(option, {
    itemCaption: title,
    title: _crTitle(title),
    subtitle: _crSubtitle(json, value)
  });
};

var addConfig = function addConfig(builder, json, option, data) {
  var _btTitleTo = _crBtTitleTo(json),
      _option$value2 = option.value,
      value = _option$value2 === void 0 ? '' : _option$value2,
      dVolume = data.dVolume,
      dColumn = data.dColumn,
      dToVolume = data.dToVolume,
      dHL = data.dHL;

  return builder.addMiniVolume(_crMiniVolume(value, dColumn, dVolume)).addMiniVolume(_crMiniVolume(_btTitleTo, [], dToVolume)).addMiniHL({
    data: dHL
  });
};

var toHdConfig = (0, _crAdapterType["default"])({
  crData: crData,
  crConfOption: crConfOption,
  trOption: trOption,
  addConfig: addConfig
});
var _default = toHdConfig;
exports["default"] = _default;
//# sourceMappingURL=toHdConfig.js.map