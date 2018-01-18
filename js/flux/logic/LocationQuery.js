'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DateUtils = require('../../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _renamePropName = function _renamePropName(obj) {
  var bT = obj.bT,
      cT = obj.cT,
      v = obj.v,
      cN = obj.cN,
      fD = obj.fD,
      tD = obj.tD;

  return {
    browserType: bT,
    chartType: cT,
    value: v,
    columnName: cN,
    fromDate: fD,
    toDate: tD
  };
};

var _crOptions = function _crOptions(obj) {
  var options = _renamePropName(obj);
  var toDate = options.toDate,
      value = options.value;

  return Object.assign({}, options, obj, {
    toDate: toDate || _DateUtils2.default.getToDate(),
    title: value,
    key: value
  });
};

var LocationQuery = {
  toOptions: function toOptions(obj) {
    var options = _crOptions(obj);
    return options;
  }
};

exports.default = LocationQuery;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\LocationQuery.js.map