"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _stockBuilderFn = require("../../charts/stockBuilderFn");
var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));
var _fnAdapter = require("./fnAdapter");
const _crMvOption = (btTitle, dVolume, dColumn) => ({
  btTitle,
  title: btTitle + " USD",
  dVolume,
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
const toChartConfig = (0, _crAdapterType.default)({
  crData: _fnAdapter.crData,
  addConfOption: _fnAdapter.addConfOption,
  addToConfig
});
var _default = toChartConfig;
exports.default = _default;
//# sourceMappingURL=toChartConfig.js.map