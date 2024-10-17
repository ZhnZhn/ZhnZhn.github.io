"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterCategory = _interopRequireDefault(require("../crAdapterCategory"));
var _AdapterFn = require("../AdapterFn");
var _CategoryFn = require("../CategoryFn");
var _compareByFn = require("../compareByFn");
const _getByProps = (json, propName) => (json || {})[propName] || "n/a";
const crItemCaption = (_ref, json) => {
  let {
    itemCaption
  } = _ref;
  return `${itemCaption || ""} ${(0, _AdapterFn.numberFormat)(_getByProps(json, "net_assets"), "")}`;
};
const crData = (json, option) => {
  const {
      holdings
    } = json || {},
    data = (0, _compareByFn.sortDescCategory)(holdings.map(item => {
      return (0, _CategoryFn.crCategoryPoint)(parseFloat(item.weight), item.symbol);
    }, []));
  option.subtitle = `${option.itemCaption}, Net Expense Ratio ${_getByProps(json, "net_expense_ratio")}`;
  option.title = `Portfolio Turnover ${_getByProps(json, "portfolio_turnover")}, Dividend Yield ${_getByProps(json, "dividend_yield")}`;
  return data;
};
const EtfProfileAdapter = (0, _crAdapterCategory.default)(crData, crItemCaption);
var _default = exports.default = EtfProfileAdapter;
//# sourceMappingURL=EtfProfileAdapter.js.map