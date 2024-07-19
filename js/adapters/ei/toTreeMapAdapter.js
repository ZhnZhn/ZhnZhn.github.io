"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _fToTreeMapAdapter = require("../fToTreeMapAdapter");
const _getDataTotalTuple = json => json.data.reduce((tuple, item) => {
  const [label, value] = item || [];
  if ((0, _AdapterFn.isNumber)(value)) {
    tuple[0].push({
      label,
      value,
      color: (0, _fToTreeMapAdapter.crItemColor)(label)
    });
    tuple[1] += value;
  }
  return tuple;
}, [[], 0]);
const toTreeMapAdapter = (0, _fToTreeMapAdapter.fToTreeMapAdapter)(_getDataTotalTuple);
var _default = exports.default = toTreeMapAdapter;
//# sourceMappingURL=toTreeMapAdapter.js.map