"use strict";

exports.__esModule = true;
exports.default = void 0;
var _crAdapterRouter = require("../crAdapterRouter");
var _toTsCategoryAdapter = require("../toTsCategoryAdapter");
var _toTsLineAdapter = require("../toTsLineAdapter");
const IrenaAdapter = (0, _crAdapterRouter.crAdapterGetRoute)((0, _crAdapterRouter.fGetRouteCategory)(_toTsCategoryAdapter.toTsCategoryAdapter, _toTsLineAdapter.toTsLineAdapter));
var _default = exports.default = IrenaAdapter;
//# sourceMappingURL=IrenaAdapter.js.map