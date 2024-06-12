"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));
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
  return config;
};
const toSplineAdapter = (0, _crAdapterType.default)({
  crData: _fnAdapter.toDataPoints,
  trOption,
  addToConfig
});
var _default = exports.default = toSplineAdapter;
//# sourceMappingURL=toSplineAdapter.js.map