"use strict";

exports.__esModule = true;
exports.default = void 0;
var _arrFn = require("../../utils/arrFn");
var _stockBuilderFn = require("../../charts/stockBuilderFn");
var _crAdapterType = require("../crAdapterType1");
const _crInfo = _ref => {
  let {
    title,
    _nativeUrl
  } = _ref;
  return {
    name: title,
    href: [_nativeUrl, 'Coin Gecko Chart']
  };
};
const _crMvOption = (btTitle, currency, data) => ({
  btTitle,
  title: (0, _arrFn.joinByBlank)(btTitle, currency),
  data
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
const toChart = (0, _crAdapterType.crAdapterType1)({
  crData,
  addConfOption,
  addToConfig
});
var _default = exports.default = toChart;
//# sourceMappingURL=toChart.js.map