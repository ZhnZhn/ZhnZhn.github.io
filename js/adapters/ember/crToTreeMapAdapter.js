"use strict";

exports.__esModule = true;
exports.default = void 0;
var _fToTreeMapAdapter = require("../fToTreeMapAdapter");
var _fnAdapter = require("./fnAdapter");
const ARR_VARIABLES = ["Coal", "Gas", "Other Fossil", "Nuclear", "Other Renewables", "Bioenergy", "Hydro", "Solar", "Wind"],
  _isFuel = label => ARR_VARIABLES.indexOf(label) !== -1;
const crToTreeMapAdapter = option => {
  const metric = (0, _fnAdapter.getMetricValue)(option),
    getItemValue = item => item[metric],
    getItemLabel = item => item.variable,
    getDataTotalTuple = json => json.reduce((tuple, item) => {
      const label = getItemLabel(item),
        value = getItemValue(item);
      if (_isFuel(label) && (0, _fnAdapter.isNumber)(value)) {
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