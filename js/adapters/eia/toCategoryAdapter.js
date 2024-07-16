"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterCategory = _interopRequireDefault(require("../crAdapterCategory"));
var _CategoryFn = require("../CategoryFn");
var _compareByFn = require("../compareByFn");
const _isState = stateid => stateid && stateid.length === 2 && stateid !== "US";
const crCategoryData = (json, option) => {
  const data = json.response.data;
  return (0, _compareByFn.sortDescCategory)(data.reduce((arr, item) => {
    const {
      stateid,
      stateDescription
    } = item || {};
    if (_isState(stateid) && stateDescription) {
      arr.push((0, _CategoryFn.crCategoryPoint)(parseFloat(item.price), `${stateDescription} (${stateid})`));
    }
    return arr;
  }, []));
};
const toCategoryAdapter = (0, _crAdapterCategory.default)(crCategoryData);
var _default = exports.default = toCategoryAdapter;
//# sourceMappingURL=toCategoryAdapter.js.map