"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _CategoryFn = require("../CategoryFn");

var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));

var _crFromYearData = _interopRequireDefault(require("../crFromYearData"));

var _toCategoryAdapter = _interopRequireDefault(require("./toCategoryAdapter"));

const toLineAdapter = (0, _crAdapterType.default)({
  crData: _crFromYearData.default
});

const _getAdapter = option => {
  const {
    seriaType
  } = option;
  return (0, _CategoryFn.isCategory)(seriaType) ? _toCategoryAdapter.default : toLineAdapter;
};

const IrenaAdapter = {
  toConfig: (json, option) => {
    const _adapter = _getAdapter(option);

    return _adapter.toConfig(json, option);
  },
  toSeries: (json, option, chart) => {
    const _adapter = _getAdapter(option);

    return _adapter.toSeries(json, option, chart);
  }
};
var _default = IrenaAdapter;
exports.default = _default;
//# sourceMappingURL=IrenaAdapter.js.map