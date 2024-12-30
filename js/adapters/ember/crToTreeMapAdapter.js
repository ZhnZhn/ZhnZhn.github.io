"use strict";

exports.__esModule = true;
exports.default = void 0;
var _fToTreeMapAdapter = require("../fToTreeMapAdapter");
var _fnAdapter = require("./fnAdapter");
const crToTreeMapAdapter = option => {
  const getItemLabelValue = (0, _fnAdapter.crGetItemLabelValue)(option),
    getDataTotalTuple = json => json.reduce((tuple, item) => {
      const [label, value] = getItemLabelValue(item);
      if ((0, _fnAdapter.isTreeMapItem)(label, value)) {
        item.label = label;
        item.value = value;
        item.color = (0, _fToTreeMapAdapter.crItemColor)(label);
        tuple[0].push(item);
        tuple[1] += value;
      }
      return tuple;
    }, [[], 0]);
  return (0, _fToTreeMapAdapter.fToTreeMapAdapter)(getDataTotalTuple);
};
var _default = exports.default = crToTreeMapAdapter;
//# sourceMappingURL=crToTreeMapAdapter.js.map