"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _toTreeMap = _interopRequireDefault(require("./toTreeMap"));

var _toSeriesConfig = _interopRequireDefault(require("./toSeriesConfig"));

const toConfig = (json, option) => {
  if (option.two === 'AG2') {
    return (0, _toTreeMap.default)(json, option);
  }

  return (0, _toSeriesConfig.default)(json, option);
};

var _default = toConfig;
exports.default = _default;
//# sourceMappingURL=toConfig.js.map