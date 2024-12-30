"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.toBarTreeMapAdapter = void 0;
var _crAdapterCategory = _interopRequireDefault(require("../crAdapterCategory"));
var _CategoryFn = require("../CategoryFn");
var _compareByFn = require("../compareByFn");
var _fToTreeMapAdapter = require("../fToTreeMapAdapter");
var _fnAdapter = require("./fnAdapter");
const crData = (json, option) => {
  const getItemLabelValue = (0, _fnAdapter.crGetItemLabelValue)(option);
  return (0, _compareByFn.sortDescCategory)(json.reduce((data, item) => {
    const [label, value] = getItemLabelValue(item);
    if ((0, _fnAdapter.isTreeMapItem)(label, value)) {
      const point = (0, _CategoryFn.crCategoryPoint)(value, label);
      point.color = (0, _fToTreeMapAdapter.crItemColor)(label);
      data.push(point);
    }
    return data;
  }, []));
};
const toBarTreeMapAdapter = exports.toBarTreeMapAdapter = (0, _crAdapterCategory.default)(crData);
//# sourceMappingURL=toBarTreeMapAdapter.js.map