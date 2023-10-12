"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _fToTreeMapAdapter = require("../fToTreeMapAdapter");
const _getDataTotalTuple = json => ((json || {}).data || []).reduce((tuple, item) => {
  const value = item.value;
  if ((0, _AdapterFn.isNumber)(value)) {
    item.color = (0, _fToTreeMapAdapter.crItemColor)(item.label);
    tuple[0].push(item);
    tuple[1] += value;
  }
  return tuple;
}, [[], 0]);
const toTreeMapAdapter = (0, _fToTreeMapAdapter.fToTreeMapAdapter)(_getDataTotalTuple);
var _default = exports.default = toTreeMapAdapter;
//# sourceMappingURL=toTreeMapAdapter.js.map