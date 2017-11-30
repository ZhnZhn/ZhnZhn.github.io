'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _Type = require('../../constants/Type');

var _LocationQuery = require('./LocationQuery');

var _LocationQuery2 = _interopRequireDefault(_LocationQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C = {
  SM_WIKI: 'SM_WIKI',
  UN: 'UN',
  QE: 'QE',
  Q: 'Q'
};

var _trSearchToOptions = function _trSearchToOptions() {
  var search = window.location ? window.location.search : null;
  try {
    var obj = _queryString2.default.parse(search);

    if (obj && obj.cT === C.SM_WIKI || obj.bT === C.UN || obj.bT === C.QE) {
      return _LocationQuery2.default.toOptions(obj);
    } else {
      return undefined;
    }
  } catch (err) {
    return undefined;
  }
};

var LocationSearch = {
  load: function load(Action) {
    var options = _trSearchToOptions();

    if (options) {
      Action.showModalDialog(_Type.ModalDialog.ASK, { options: options });
    }
  }
};

exports.default = LocationSearch;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\LocationSearch.js.map