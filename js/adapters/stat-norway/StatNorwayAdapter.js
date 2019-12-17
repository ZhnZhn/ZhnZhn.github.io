"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _RouterConfig = _interopRequireDefault(require("./RouterConfig"));

var StatNorwayAdapter = {
  toConfig: function toConfig(json, option) {
    var seriaType = option.seriaType,
        crConfig = _RouterConfig["default"].getCrConfig(seriaType),
        config = crConfig(json, option);

    return {
      config: config
    };
  },
  toSeries: function toSeries(json, option) {
    var seriaType = option.seriaType,
        crConfig = _RouterConfig["default"].getCrConfig(seriaType),
        config = crConfig(json, option);

    return config.series[0];
  }
};
var _default = StatNorwayAdapter;
exports["default"] = _default;
//# sourceMappingURL=StatNorwayAdapter.js.map