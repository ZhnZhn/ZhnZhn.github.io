"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));

var _fnAdapter = require("./fnAdapter");

const _crMvOption = (btTitle, dVolume, dColumn) => ({
  btTitle,
  title: btTitle + " USD",
  dVolume,
  dColumn
});

const addConfig = (builder, json, option, data) => {
  const {
    dVolume,
    dColumn,
    dMarketCap
  } = data;
  return builder.addMiniVolume(_crMvOption('Volume', dVolume, dColumn)).addMiniVolume(_crMvOption('Market Cap', dMarketCap));
};

const toChartConfig = (0, _crAdapterType.default)({
  crData: _fnAdapter.crData,
  addConfOption: _fnAdapter.addConfOption,
  addConfig
});
var _default = toChartConfig;
exports.default = _default;
//# sourceMappingURL=toChartConfig.js.map