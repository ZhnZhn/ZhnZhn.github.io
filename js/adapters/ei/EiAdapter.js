"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = require("../crAdapterType1");
var _crFromYearData = _interopRequireDefault(require("../crFromYearData"));
var _toCategoryAdapter = _interopRequireDefault(require("../toCategoryAdapter"));
var _crAdapterRouter = require("../crAdapterRouter");
var _toTreeMapAdapter = _interopRequireDefault(require("./toTreeMapAdapter"));
var _toBarTreeMapAdapter = _interopRequireDefault(require("./toBarTreeMapAdapter"));
const toLineAdapter = (0, _crAdapterType.crAdapterType1)({
    crData: _crFromYearData.default
  }),
  IeAdapter = (0, _crAdapterRouter.crAdapterRouter)({
    getRoute: (0, _crAdapterRouter.fGetRouteBarTreeMap)(_toBarTreeMapAdapter.default, _toTreeMapAdapter.default, _toCategoryAdapter.default, toLineAdapter)
  });
var _default = exports.default = IeAdapter;
//# sourceMappingURL=EiAdapter.js.map