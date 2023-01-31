"use strict";

exports.__esModule = true;
exports.default = void 0;
var _configBuilderFn = require("./configBuilderFn");
const SeriaBuilder = {
  addSeriaBy(index, obj) {
    (0, _configBuilderFn.fAddSeriaBy)(index, obj)(this.config);
    return this;
  },
  addSeries(series, isWithoutLegend) {
    if (isWithoutLegend === void 0) {
      isWithoutLegend = false;
    }
    (0, _configBuilderFn.fAddSeries)(series, isWithoutLegend)(this.config);
    return this;
  },
  toSeria() {
    return this.config;
  }
};
var _default = SeriaBuilder;
exports.default = _default;
//# sourceMappingURL=SeriaBuilder.js.map