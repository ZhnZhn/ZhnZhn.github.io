"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _CategoryFn = require("../CategoryFn");
var _AdapterFn = require("../AdapterFn");
var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));
var _crFromYearData = _interopRequireDefault(require("../crFromYearData"));
var _crAdapterRouter = require("../crAdapterRouter");
var _toCategoryAdapter = _interopRequireDefault(require("../toCategoryAdapter"));
var _toTreeMapAdapter = _interopRequireDefault(require("./toTreeMapAdapter"));
const toLineAdapter = (0, _crAdapterType.default)({
    crData: (json, option) => {
      const _data = (0, _crFromYearData.default)(json, option),
        fromDate = option.fromDate,
        _fromDateUTC = (0, _AdapterFn.ymdToUTC)(fromDate);
      return (0, _AdapterFn.isNumber)(_fromDateUTC) ? _data.filter(p => p[0] > _fromDateUTC) : _data;
    }
  }),
  getRoute = option => (0, _CategoryFn.isTreeMap)(option.seriaType) ? _toTreeMapAdapter.default : (0, _CategoryFn.isCategory)(option.seriaType) ? _toCategoryAdapter.default : toLineAdapter,
  IrenaAdapter = (0, _crAdapterRouter.crAdapterRouter)({
    getRoute
  });
var _default = exports.default = IrenaAdapter;
//# sourceMappingURL=EiAdapter.js.map