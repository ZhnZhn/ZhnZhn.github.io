"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.sortDescBy = exports.compareByY = exports.compareByValueId = exports.compareByValue = exports.compareByDate = void 0;
var _fCompareBy = _interopRequireDefault(require("../utils/fCompareBy"));
var _fCompareByTwoProps = _interopRequireDefault(require("../utils/fCompareByTwoProps"));
const compareByDate = (0, _fCompareBy.default)(0),
  compareByY = (0, _fCompareBy.default)('y'),
  compareByValue = (0, _fCompareBy.default)('value'),
  compareByValueId = (0, _fCompareByTwoProps.default)('value', 'id'),
  sortDescBy = (compareBy, data) => data.sort(compareBy).reverse();
exports.sortDescBy = sortDescBy;
exports.compareByValueId = compareByValueId;
exports.compareByValue = compareByValue;
exports.compareByY = compareByY;
exports.compareByDate = compareByDate;
//# sourceMappingURL=compareByFn.js.map