"use strict";

exports.__esModule = true;
exports.default = void 0;
var _stockBuilderFn = require("../../charts/stockBuilderFn");
var _crAdapterType = require("../crAdapterType1");
var _fnAdapter = require("./fnAdapter");
const _crMvOption = (btTitle, data, dColumn) => ({
  btTitle,
  title: `${btTitle} USD`,
  data,
  dColumn
});
const addToConfig = (config, json, option, data) => {
  const {
    dVolume,
    dColumn,
    dMarketCap
  } = data;
  return (0, _stockBuilderFn.fAddMiniVolumes)([_crMvOption('Volume', dVolume, dColumn), _crMvOption('Market Cap', dMarketCap)])(config);
};
const toChartConfig = (0, _crAdapterType.crAdapterType1)({
  crData: _fnAdapter.crData,
  addConfOption: _fnAdapter.addConfOption,
  addToConfig
});
var _default = exports.default = toChartConfig;
//# sourceMappingURL=toChartConfig.js.map