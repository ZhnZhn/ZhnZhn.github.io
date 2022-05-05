"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));

var _crFn = require("../crFn");

const _crDescription = _crFn.crItemLink.bind(null, 'Coin Gecko');

const _crInfo = _ref => {
  let {
    title,
    _nativeUrl
  } = _ref;
  return {
    name: title,
    description: _crDescription(_nativeUrl)
  };
};

const _crMvOption = (btTitle, currency, dVolume) => ({
  btTitle,
  title: btTitle + " " + currency,
  dVolume
});

const crData = _ref2 => {
  let {
    prices
  } = _ref2;
  return prices;
},
      addConfOption = option => ({
  info: _crInfo(option)
}),
      addConfig = (builder, json, option) => {
  const {
    total_volumes,
    market_caps
  } = json,
        {
    _currency
  } = option;
  return builder.addMiniVolume(_crMvOption('Volume', _currency, total_volumes)).addMiniVolume(_crMvOption('Market Cap', _currency, market_caps));
};

const toChart = (0, _crAdapterType.default)({
  crData,
  addConfOption,
  addConfig
});
var _default = toChart;
exports.default = _default;
//# sourceMappingURL=toChart.js.map