"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterRouter = require("../crAdapterRouter");
var _toBarTreeMapAdapter = _interopRequireDefault(require("../toBarTreeMapAdapter"));
var _fToTreeMapAdapter = require("../fToTreeMapAdapter");
var _toTsCategoryAdapter = require("../toTsCategoryAdapter");
var _toTsLineAdapter = require("../toTsLineAdapter");
const IeAdapter = (0, _crAdapterRouter.crAdapterGetRoute)((0, _crAdapterRouter.fGetRouteBarTreeMap)(_toBarTreeMapAdapter.default, _fToTreeMapAdapter.toTimeSeriesTreeMapAdapter, _toTsCategoryAdapter.toTsCategoryAdapter, _toTsLineAdapter.toTsLineAdapter));
var _default = exports.default = IeAdapter;
//# sourceMappingURL=EiAdapter.js.map