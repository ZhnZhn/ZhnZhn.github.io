"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = require("../crAdapterType1");
var _crTsFromData = _interopRequireDefault(require("../crTsFromData"));
var _toTsCategoryAdapter = require("../toTsCategoryAdapter");
var _crAdapterRouter = require("../crAdapterRouter");
var _fToTreeMapAdapter = require("../fToTreeMapAdapter");
var _toBarTreeMapAdapter = _interopRequireDefault(require("./toBarTreeMapAdapter"));
//import toTreeMapAdapter from './toTreeMapAdapter';

const toLineAdapter = (0, _crAdapterType.crAdapterType1)({
    crData: _crTsFromData.default
  }),
  IeAdapter = (0, _crAdapterRouter.crAdapterRouter)({
    getRoute: (0, _crAdapterRouter.fGetRouteBarTreeMap)(_toBarTreeMapAdapter.default, _fToTreeMapAdapter.toTimeSeriesTreeMapAdapter, _toTsCategoryAdapter.toTsCategoryAdapter, toLineAdapter)
  });
var _default = exports.default = IeAdapter;
//# sourceMappingURL=EiAdapter.js.map