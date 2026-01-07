"use strict";

exports.__esModule = true;
exports.sortDescCategory = exports.sortDescByPnValue = exports.compareByValueId = exports.compareByDate = void 0;
var _compareBy = require("../utils/compareBy");
const _compareByPnValue = (0, _compareBy.fCompareBy)('value'),
  _compareByPnYAndName = (0, _compareBy.fCompareByTwoProps)('y', 'name'),
  _fSortDescBy = compareBy => data => data.sort(compareBy).reverse();
const compareByDate = exports.compareByDate = (0, _compareBy.fCompareBy)(0),
  compareByValueId = exports.compareByValueId = (0, _compareBy.fCompareByTwoProps)('value', 'id'),
  sortDescCategory = exports.sortDescCategory = _fSortDescBy(_compareByPnYAndName),
  sortDescByPnValue = exports.sortDescByPnValue = _fSortDescBy(_compareByPnValue);
//# sourceMappingURL=compareByFn.js.map