"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.sortDescCategory = exports.sortDescByPnValue = exports.compareByValueId = exports.compareByDate = void 0;
var _fCompareBy = _interopRequireDefault(require("../utils/fCompareBy"));
var _fCompareByTwoProps = _interopRequireDefault(require("../utils/fCompareByTwoProps"));
const _compareByPnValue = (0, _fCompareBy.default)('value'),
  _compareByPnYAndName = (0, _fCompareByTwoProps.default)('y', 'name'),
  _fSortDescBy = compareBy => data => data.sort(compareBy).reverse();
const compareByDate = exports.compareByDate = (0, _fCompareBy.default)(0),
  compareByValueId = exports.compareByValueId = (0, _fCompareByTwoProps.default)('value', 'id'),
  sortDescCategory = exports.sortDescCategory = _fSortDescBy(_compareByPnYAndName),
  sortDescByPnValue = exports.sortDescByPnValue = _fSortDescBy(_compareByPnValue);
//# sourceMappingURL=compareByFn.js.map