"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _CategoryFn = require("../CategoryFn");
var _compareByFn = require("../compareByFn");
var _crAdapterCategory = _interopRequireDefault(require("../crAdapterCategory"));
var _fnAdapter = require("./fnAdapter");
const _isStrInclude = (str, token) => str.indexOf(token) !== -1;

//Unicode character patch
const _crReportingEconomy = reportingEconomy => _isStrInclude(reportingEconomy, "rkiye") ? "Türkiye" : _isStrInclude(reportingEconomy, "Ivoire") ? "Côte d'Ivoire" : _isStrInclude(reportingEconomy, "Principe") ? "Sao Tomé and Principe" : reportingEconomy;
const _crData = (json, option) => (0, _compareByFn.sortDescCategory)((0, _fnAdapter.getDataset)(json).reduce((data, item) => {
    const {
      Value,
      ReportingEconomy
    } = item || {};
    if ((0, _isTypeFn.isNumber)(Value) && (0, _isTypeFn.isStr)(ReportingEconomy)) {
      data.push((0, _CategoryFn.crCategoryPoint)(item.Value, _crReportingEconomy(item.ReportingEconomy)));
    }
    return data;
  }, [])),
  toCategoryAdapter = (0, _crAdapterCategory.default)(_crData);
var _default = exports.default = toCategoryAdapter;
//# sourceMappingURL=toCategoryAdapter.js.map