'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _ComponentActions = require('../actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

var _LocationQuery = require('./LocationQuery');

var _LocationQuery2 = _interopRequireDefault(_LocationQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ARR_B = ['UN', 'QE', 'FAO'];
var ARR_C = ['SM_WIKI', 'SM_IEX_CHART_5Y', 'SM_IEX_CHART_2Y', 'USAE_BLS_1', 'BC_HD'];

var _isQuery = function _isQuery(obj) {
  return obj && ARR_C.indexOf(obj.cT) !== -1 || ARR_B.indexOf(obj.bT) !== -1;
};

var _trSearchToOptions = function _trSearchToOptions() {
  try {
    var search = window.location ? window.location.search : null,
        obj = _queryString2.default.parse(search);
    return _isQuery(obj) ? _LocationQuery2.default.toOptions(obj) : undefined;
  } catch (err) {
    return undefined;
  }
};

var LocationSearch = {
  load: function load() {
    var options = _trSearchToOptions();
    if (options) {
      _ComponentActions2.default.showAsk({ options: options });
    }
  }
};

exports.default = LocationSearch;
//# sourceMappingURL=LocationSearch.js.map