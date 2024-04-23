"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _CategoryFn = require("../CategoryFn");
var _compareByFn = require("../compareByFn");
var _crAdapterCategory = _interopRequireDefault(require("../crAdapterCategory"));
const _isStrInclude = (str, token) => str.indexOf(token) !== -1;

//Unicode character patch
const _crReportingEconomy = reportingEconomy => _isStrInclude(reportingEconomy, "rkiye") ? "Türkiye" : _isStrInclude(reportingEconomy, "Ivoire") ? "Côte d'Ivoire" : _isStrInclude(reportingEconomy, "Principe") ? "Sao Tomé and Principe" : reportingEconomy;
const _crData = (json, option) => json.Dataset.reduce((data, item) => {
    const {
      Value,
      ReportingEconomy
    } = item || {};
    if ((0, _AdapterFn.isNumber)(Value) && (0, _AdapterFn.isStr)(ReportingEconomy)) {
      data.push((0, _CategoryFn.crCategoryPoint)(item.Value, _crReportingEconomy(item.ReportingEconomy)));
    }
    return data;
  }, []).sort(_compareByFn.compareByPnY).reverse(),
  toCategoryAdapter = (0, _crAdapterCategory.default)(_crData);
var _default = exports.default = toCategoryAdapter;
//# sourceMappingURL=toCategoryAdapter.js.map