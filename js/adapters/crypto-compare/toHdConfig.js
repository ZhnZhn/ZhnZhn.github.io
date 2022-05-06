"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));

var _fnAdapter = require("./fnAdapter");

const _crTitle = (title, items) => {
  const _time = (0, _fnAdapter.getValue)(items[2]) === 'histoday' ? '00:00 GMT+0' : 'GMT+0';

  return title + ": Values on " + _time;
};

const _getTsym = (json, option) => {
  const {
    ConversionType
  } = json,
        {
    conversionSymbol,
    type = ''
  } = ConversionType || {};
  return {
    tsym: conversionSymbol || option.tsym,
    type
  };
};

const _crSubtitle = (json, option) => {
  const {
    value,
    exchange
  } = option,
        {
    tsym,
    type
  } = _getTsym(json, option);

  return exchange + ": " + value + "/" + tsym + " " + type;
};

const _crBtTitleTo = (json, option) => {
  const {
    tsym
  } = _getTsym(json, option);

  return tsym;
};

const _crMiniVolume = (title, dColumn, dVolume) => ({
  btTitle: "Volume " + title,
  dColumn,
  dVolume
});

const trOption = (option, json) => {
  const {
    title,
    items
  } = option;
  (0, _fnAdapter._assign)(option, {
    itemCaption: title,
    title: _crTitle(title, items),
    subtitle: _crSubtitle(json, option)
  });
};

const addConfig = (builder, json, option, data) => {
  const _btTitleTo = _crBtTitleTo(json, option),
        {
    value
  } = option,
        {
    dVolume,
    dColumn,
    dToVolume,
    dHL
  } = data;

  return builder.addMiniVolume(_crMiniVolume(value, dColumn, dVolume)).addMiniVolume(_crMiniVolume(_btTitleTo, [], dToVolume)).addMiniHL({
    data: dHL
  });
};

const toHdConfig = (0, _crAdapterType.default)({
  crData: _fnAdapter.crData,
  crConfOption: _fnAdapter.crConfOption,
  trOption,
  addConfig
});
var _default = toHdConfig;
exports.default = _default;
//# sourceMappingURL=toHdConfig.js.map