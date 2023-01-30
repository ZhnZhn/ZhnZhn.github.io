"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _stockBuilderFn = require("../../charts/stockBuilderFn");
var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));
var _fnAdapter = require("./fnAdapter");
const _crDescription = _fnAdapter.crItemLink.bind(null, 'Coin Gecko');
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
  addToConfig = (config, json, option) => {
    const {
        total_volumes,
        market_caps
      } = json,
      {
        _currency
      } = option;
    return (0, _stockBuilderFn.fAddMiniVolumes)([_crMvOption('Volume', _currency, total_volumes), _crMvOption('Market Cap', _currency, market_caps)])(config);
  };
const toChart = (0, _crAdapterType.default)({
  crData,
  addConfOption,
  addToConfig
});
var _default = toChart;
exports.default = _default;
//# sourceMappingURL=toChart.js.map