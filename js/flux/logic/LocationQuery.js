'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DateUtils = require('../../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HM_S = {
  browserType: 'bT',
  chartType: 'cT',
  value: 'v',

  columnName: 'cN',
  fromDate: 'fD',
  toDate: 'tD'
};

var _keyToValue = function _keyToValue(hm) {
  var r = {};
  var propName = void 0;
  for (propName in hm) {
    r[hm[propName]] = propName;
  }
  return r;
};

var HM_R = _keyToValue(HM_S);

var LocationQuery = {
  toOptions: function toOptions(obj) {
    var options = {};
    var pN = void 0;
    for (pN in obj) {
      var propName = HM_R[pN];
      if (propName) {
        options[propName] = obj[pN];
      }
    }
    Object.assign(options, obj);

    options.toDate = options.toDate || _DateUtils2.default.getToDate();
    options.title = options.value;
    options.key = options.value;

    return options;
  }
};

exports.default = LocationQuery;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\LocationQuery.js.map