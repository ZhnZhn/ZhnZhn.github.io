"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = require("../crAdapterType1");
var _crTsFromData = _interopRequireDefault(require("../crTsFromData"));
var _toTsCategoryAdapter = require("../toTsCategoryAdapter");
var _crAdapterRouter = require("../crAdapterRouter");
const toLineAdapter = (0, _crAdapterType.crAdapterType1)({
    crData: _crTsFromData.default
  }),
  IrenaAdapter = (0, _crAdapterRouter.crAdapterRouter)({
    getRoute: (0, _crAdapterRouter.fGetRouteCategory)(_toTsCategoryAdapter.toTsCategoryAdapter, toLineAdapter)
  });
var _default = exports.default = IrenaAdapter;
//# sourceMappingURL=IrenaAdapter.js.map