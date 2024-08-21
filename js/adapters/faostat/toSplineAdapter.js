"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _crAdapterType = require("../crAdapterType1");
var _fnAdapter = require("./fnAdapter");
const trOption = (option, json) => {
  option.title = (0, _fnAdapter.crTitle)(json, option);
  option.subtitle = (0, _fnAdapter.crSubtitle)(json, option);
};
const addToConfig = (config, json, option) => {
  config.info = (0, _fnAdapter.toInfo)(json, option.title, option.subtitle);
  config.zhConfig = {
    ...(0, _fnAdapter.crZhConfig)(option),
    ...config.zhConfig
  };
  (0, _AdapterFn.addToConfigDfLink)(config, "FAOSTAT", `https://www.fao.org/faostat/en/#data/${option.dfDomain || ''}`);
  return config;
};
const toSplineAdapter = (0, _crAdapterType.crAdapterType1)({
  crData: _fnAdapter.toDataPoints,
  trOption,
  addToConfig
});
var _default = exports.default = toSplineAdapter;
//# sourceMappingURL=toSplineAdapter.js.map