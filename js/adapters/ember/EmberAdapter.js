"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));

var _crFromYearData = _interopRequireDefault(require("../crFromYearData"));

const EmberAdapter = (0, _crAdapterType.default)({
  crData: _crFromYearData.default
});
var _default = EmberAdapter;
exports.default = _default;
//# sourceMappingURL=EmberAdapter.js.map