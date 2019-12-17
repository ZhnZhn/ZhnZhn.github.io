"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _queryString = _interopRequireDefault(require("query-string"));

var _ComponentActions = _interopRequireDefault(require("../actions/ComponentActions"));

var _LocationQuery = _interopRequireDefault(require("./LocationQuery"));

var ARR_B = ['UN', 'QE', 'FAO'];
var ARR_C = ['SM_WIKI', 'SM_IEX_CHART_5Y', 'SM_IEX_CHART_2Y', 'USAE_BLS_1', 'BC_HD'];

var _isQuery = function _isQuery(obj) {
  return obj && ARR_C.indexOf(obj.cT) !== -1 || ARR_B.indexOf(obj.bT) !== -1;
};

var _trSearchToOptions = function _trSearchToOptions() {
  try {
    var search = window.location ? window.location.search : null,
        obj = _queryString["default"].parse(search);

    return _isQuery(obj) ? _LocationQuery["default"].toOptions(obj) : undefined;
  } catch (err) {
    return undefined;
  }
};

var LocationSearch = {
  load: function load() {
    var options = _trSearchToOptions();

    if (options) {
      _ComponentActions["default"].showAsk({
        options: options
      });
    }
  }
};
var _default = LocationSearch;
exports["default"] = _default;
//# sourceMappingURL=LocationSearch.js.map