"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var crData = _fnAdapter["default"].crData,
    addConfOption = _fnAdapter["default"].addConfOption;

var _crMvOption = function _crMvOption(btTitle, dVolume, dColumn) {
  return {
    btTitle: btTitle,
    title: btTitle + " USD",
    dVolume: dVolume,
    dColumn: dColumn
  };
};

var addConfig = function addConfig(builder, json, option, data) {
  var dVolume = data.dVolume,
      dColumn = data.dColumn,
      dMarketCap = data.dMarketCap;
  return builder.addMiniVolume(_crMvOption('Volume', dVolume, dColumn)).addMiniVolume(_crMvOption('Market Cap', dMarketCap));
};

var toChartConfig = (0, _crAdapterType["default"])({
  crData: crData,
  addConfOption: addConfOption,
  addConfig: addConfig
});
var _default = toChartConfig;
exports["default"] = _default;
//# sourceMappingURL=toChartConfig.js.map