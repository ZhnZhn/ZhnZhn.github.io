"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var crData = _fnAdapter["default"].crData,
    crConfOption = _fnAdapter["default"].crConfOption,
    _assign = Object.assign;
var V_ON_TIME = 'Values on 00:00 GMT';

var _crTitle = function _crTitle(title) {
  return title + ": " + V_ON_TIME;
};

var _getConversionType = function _getConversionType(_ref) {
  var ConversionType = _ref.ConversionType;
  return ConversionType || {};
};

var _getTsym = function _getTsym(json, option) {
  var _getConversionType2 = _getConversionType(json),
      conversionSymbol = _getConversionType2.conversionSymbol,
      _getConversionType2$t = _getConversionType2.type,
      type = _getConversionType2$t === void 0 ? '' : _getConversionType2$t;

  return {
    tsym: conversionSymbol || option.tsym,
    type: type
  };
};

var _crSubtitle = function _crSubtitle(json, option) {
  var value = option.value,
      exchange = option.exchange,
      _getTsym2 = _getTsym(json, option),
      tsym = _getTsym2.tsym,
      type = _getTsym2.type;

  return exchange + ": " + value + "/" + tsym + " " + type;
};

var _crBtTitleTo = function _crBtTitleTo(json, option) {
  var _getTsym3 = _getTsym(json, option),
      tsym = _getTsym3.tsym;

  return tsym;
};

var _crMiniVolume = function _crMiniVolume(title, dColumn, dVolume) {
  return {
    btTitle: "Volume " + title,
    dColumn: dColumn,
    dVolume: dVolume
  };
};

var trOption = function trOption(option, json) {
  var title = option.title;

  _assign(option, {
    itemCaption: title,
    title: _crTitle(title),
    subtitle: _crSubtitle(json, option)
  });
};

var addConfig = function addConfig(builder, json, option, data) {
  var _btTitleTo = _crBtTitleTo(json, option),
      value = option.value,
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