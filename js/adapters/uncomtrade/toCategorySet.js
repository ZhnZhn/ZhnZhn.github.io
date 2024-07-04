"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterCategory = _interopRequireDefault(require("../crAdapterCategory"));
var _CategoryFn = require("../CategoryFn");
var _compareByFn = require("../compareByFn");
var _fnAdapter = require("./fnAdapter");
const crCategoryData = (json, option) => {
  const data = (json || {}).data || [],
    hm = (0, _fnAdapter.getHmTradePartners)(option.tradePartners),
    pnValue = option.measure;
  option._itemKey = option.key;
  let value;
  return (0, _compareByFn.sortDescByPnY)(data.reduce((arr, item) => {
    value = parseFloat(item[pnValue]);
    const {
      reporterCode
    } = item || {};
    if (value && (0, _fnAdapter.isNumber)(reporterCode)) {
      arr.push((0, _CategoryFn.crCategoryPoint)(value, hm[reporterCode] || reporterCode));
    }
    return arr;
  }, []));
};
const _crItemCaption = _ref => {
  let {
    subtitle
  } = _ref;
  return (subtitle || '').split("-")[0] || 'id';
};
const toCategorySet = (0, _crAdapterCategory.default)(crCategoryData, void 0, _crItemCaption);
var _default = exports.default = toCategorySet;
//# sourceMappingURL=toCategorySet.js.map