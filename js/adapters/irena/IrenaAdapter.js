"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = require("../crAdapterType1");
var _crFromYearData = _interopRequireDefault(require("../crFromYearData"));
var _toCategoryAdapter = _interopRequireDefault(require("../toCategoryAdapter"));
var _crAdapterRouter = require("../crAdapterRouter");
const toLineAdapter = (0, _crAdapterType.crAdapterType1)({
    crData: _crFromYearData.default
  }),
  IrenaAdapter = (0, _crAdapterRouter.crAdapterRouter)({
    getRoute: (0, _crAdapterRouter.fGetRouteCategory)(_toCategoryAdapter.default, toLineAdapter)
  });
var _default = exports.default = IrenaAdapter;
//# sourceMappingURL=IrenaAdapter.js.map