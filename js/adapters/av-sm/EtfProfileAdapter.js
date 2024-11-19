"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterCategory = _interopRequireDefault(require("../crAdapterCategory"));
var _AdapterFn = require("../AdapterFn");
var _CategoryFn = require("../CategoryFn");
var _compareByFn = require("../compareByFn");
const DOMESTIC_EQUITIES = "domestic_equities";
const FOREIGN_EQUITIES = "foreign_equities";
const FOREIGN_EQUITIES_SHORT_FORM = "For. Eq.";
const _getByProps = (json, propName) => (json || {})[propName] || "n/a";
const crItemCaption = (_ref, json) => {
  let {
    itemCaption
  } = _ref;
  return `${(0, _AdapterFn.crShortItemCaption)(itemCaption)} ${(0, _AdapterFn.numberFormat)(_getByProps(json, "net_assets"), "")}`;
};
const crData = (json, option) => {
  const {
      holdings,
      asset_allocation
    } = json || {},
    data = (holdings || {}).map(item => (0, _CategoryFn.crCategoryPoint)(parseFloat(item.weight), item.symbol), []);
  (0, _AdapterFn.getObjectKeys)(asset_allocation).forEach(key => {
    if (key !== DOMESTIC_EQUITIES) {
      const value = parseFloat(asset_allocation[key]);
      if ((0, _AdapterFn.isPositiveNumber)(value)) {
        data.push((0, _CategoryFn.crCategoryPoint)(value, key === FOREIGN_EQUITIES ? FOREIGN_EQUITIES_SHORT_FORM : (0, _AdapterFn.toUpperCaseFirst)(key)));
      }
    }
  });
  option.subtitle = `${option.itemCaption}, Net Expense Ratio ${_getByProps(json, "net_expense_ratio")}`;
  option.title = `Portfolio Turnover ${_getByProps(json, "portfolio_turnover")}, Dividend Yield ${_getByProps(json, "dividend_yield")}`;
  return (0, _compareByFn.sortDescCategory)(data);
};
const EtfProfileAdapter = (0, _crAdapterCategory.default)(crData, crItemCaption);
var _default = exports.default = EtfProfileAdapter;
//# sourceMappingURL=EtfProfileAdapter.js.map