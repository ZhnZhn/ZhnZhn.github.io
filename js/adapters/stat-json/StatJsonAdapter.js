"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _RouterConfig = _interopRequireDefault(require("./RouterConfig"));

const _crConfig = (json, option) => {
  const {
    seriaType
  } = option,
        crConfig = _RouterConfig.default.getCrConfig(seriaType);

  return crConfig(json, option);
};

const StatJsonAdapter = {
  toConfig(json, option) {
    return {
      config: _crConfig(json, option)
    };
  },

  toSeries(json, option) {
    const config = _crConfig(json, option);

    return config.series[0];
  }

};
var _default = StatJsonAdapter;
exports.default = _default;
//# sourceMappingURL=StatJsonAdapter.js.map