"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));
var _crFromYearData = _interopRequireDefault(require("../crFromYearData"));
var _toCategoryAdapter = _interopRequireDefault(require("../toCategoryAdapter"));
var _crAdapterRouter = require("../crAdapterRouter");
var _toTreeMapAdapter = _interopRequireDefault(require("./toTreeMapAdapter"));
const toLineAdapter = (0, _crAdapterType.default)({
    crData: _crFromYearData.default
  }),
  IeAdapter = (0, _crAdapterRouter.crAdapterRouter)({
    getRoute: (0, _crAdapterRouter.fGetRouteTreeMap)(_toTreeMapAdapter.default, _toCategoryAdapter.default, toLineAdapter)
  });
var _default = exports.default = IeAdapter;
//# sourceMappingURL=EiAdapter.js.map