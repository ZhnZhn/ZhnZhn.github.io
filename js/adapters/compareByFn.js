"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.sortDescByPnY = exports.sortDescBy = exports.compareByValueId = exports.compareByValue = exports.compareByPnY = exports.compareByDate = void 0;
var _fCompareBy = _interopRequireDefault(require("../utils/fCompareBy"));
var _fCompareByTwoProps = _interopRequireDefault(require("../utils/fCompareByTwoProps"));
const compareByDate = (0, _fCompareBy.default)(0),
  compareByPnY = (0, _fCompareBy.default)('y'),
  compareByValue = (0, _fCompareBy.default)('value'),
  compareByValueId = (0, _fCompareByTwoProps.default)('value', 'id'),
  sortDescBy = (compareBy, data) => data.sort(compareBy).reverse(),
  sortDescByPnY = data => sortDescBy(compareByPnY, data);
exports.sortDescByPnY = sortDescByPnY;
exports.sortDescBy = sortDescBy;
exports.compareByValueId = compareByValueId;
exports.compareByValue = compareByValue;
exports.compareByPnY = compareByPnY;
exports.compareByDate = compareByDate;
//# sourceMappingURL=compareByFn.js.map