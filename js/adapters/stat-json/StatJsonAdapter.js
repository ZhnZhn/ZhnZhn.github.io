"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _RouterConfig = _interopRequireDefault(require("./RouterConfig"));

var _fToCategorySeries = _interopRequireDefault(require("../fToCategorySeries"));

const _crConfig = (json, option) => {
  const crConfig = _RouterConfig.default.getCrConfig((option || {}).seriaType);

  return {
    config: crConfig(json, option)
  };
};

const StatJsonAdapter = {
  toConfig: _crConfig,
  toSeries: (0, _fToCategorySeries.default)(_crConfig)
};
var _default = StatJsonAdapter;
exports.default = _default;
//# sourceMappingURL=StatJsonAdapter.js.map