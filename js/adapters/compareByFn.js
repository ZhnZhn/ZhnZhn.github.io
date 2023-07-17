"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.sortDescByPnY = exports.sortDescByPnValue = exports.sortDescBy = exports.compareByValueId = exports.compareByPnY = exports.compareByDate = void 0;
var _fCompareBy = _interopRequireDefault(require("../utils/fCompareBy"));
var _fCompareByTwoProps = _interopRequireDefault(require("../utils/fCompareByTwoProps"));
const _compareByPnValue = (0, _fCompareBy.default)('value');
const compareByDate = (0, _fCompareBy.default)(0),
  compareByPnY = (0, _fCompareBy.default)('y'),
  compareByValueId = (0, _fCompareByTwoProps.default)('value', 'id'),
  sortDescBy = (compareBy, data) => data.sort(compareBy).reverse(),
  sortDescByPnY = data => sortDescBy(compareByPnY, data),
  sortDescByPnValue = data => sortDescBy(_compareByPnValue, data);
exports.sortDescByPnValue = sortDescByPnValue;
exports.sortDescByPnY = sortDescByPnY;
exports.sortDescBy = sortDescBy;
exports.compareByValueId = compareByValueId;
exports.compareByPnY = compareByPnY;
exports.compareByDate = compareByDate;
//# sourceMappingURL=compareByFn.js.map