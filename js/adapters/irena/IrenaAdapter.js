"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _CategoryFn = require("../CategoryFn");
var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));
var _crFromYearData = _interopRequireDefault(require("../crFromYearData"));
var _crAdapterRouter = _interopRequireDefault(require("../crAdapterRouter"));
var _toCategoryAdapter = _interopRequireDefault(require("./toCategoryAdapter"));
const toLineAdapter = (0, _crAdapterType.default)({
    crData: _crFromYearData.default
  }),
  getRoute = option => (0, _CategoryFn.isCategory)(option.seriaType) ? _toCategoryAdapter.default : toLineAdapter,
  IrenaAdapter = (0, _crAdapterRouter.default)(void 0, {
    getRoute
  });
var _default = IrenaAdapter;
exports.default = _default;
//# sourceMappingURL=IrenaAdapter.js.map