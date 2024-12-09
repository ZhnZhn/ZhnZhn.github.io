"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.toYearlyAdapter = void 0;
var _toYearsByMonths = _interopRequireDefault(require("../toYearsByMonths"));
var _NdlFn = require("./NdlFn");
const toYearlyAdapter = exports.toYearlyAdapter = {
  toConfig(json, option) {
    return {
      config: (0, _toYearsByMonths.default)((0, _NdlFn.getData)(json), option)
    };
  },
  isAdd() {
    return false;
  }
};
//# sourceMappingURL=toYearlyAdapter.js.map