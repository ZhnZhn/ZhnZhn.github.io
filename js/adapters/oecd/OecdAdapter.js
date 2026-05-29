"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterRouter = require("../crAdapterRouter");
var _toCategoryAdapter = _interopRequireDefault(require("./toCategoryAdapter"));
var _toLineAdapter = _interopRequireDefault(require("./toLineAdapter"));
const OecdAdapter = (0, _crAdapterRouter.crAdapterGetRoute)((0, _crAdapterRouter.fGetRouteCategory)(_toCategoryAdapter.default, _toLineAdapter.default));
var _default = exports.default = OecdAdapter;
//# sourceMappingURL=OecdAdapter.js.map