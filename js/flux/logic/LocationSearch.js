'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _DateUtils = require('../../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _Type = require('../../constants/Type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DF_TITLE = 'Item from search, more on Info Tab';
var DF_SUFFIX_TITLE = ', more on Info Tab';
var BLANK = '';
var QE = "QE";
var QE_BLSI = "QE_BLSI";
var Q = "Q";
var YEAR_MINUS = 15;

var _trSearchToOptions = function _trSearchToOptions() {
  var search = window.location ? window.location.search : null;
  var obj = _queryString2.default.parse(search);

  if (obj && obj.bT === QE && obj.cT === QE_BLSI && obj.lI == Q) {
    var _title = obj.t ? obj.t + DF_SUFFIX_TITLE : DF_TITLE,
        _name = obj.t ? obj.t : BLANK,
        _fromDate = obj.fD ? obj.fD : _DateUtils2.default.getFromDate(YEAR_MINUS);
    return {
      browserType: obj.bT,
      chartType: obj.cT,
      fromDate: _fromDate,
      toDate: _DateUtils2.default.getToDate(),
      loadId: obj.lI,
      key: obj.id,
      value: obj.id,
      title: _title,
      name: _name
    };
  } else {
    return undefined;
  }
};

var LocationSearch = {
  load: function load(componentActions) {
    var options = _trSearchToOptions();

    if (options) {
      componentActions.showModalDialog(_Type.ModalDialog.ASK, { options: options });
    }
  }
};

exports.default = LocationSearch;
//# sourceMappingURL=LocationSearch.js.map