"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _compareByFn = require("../compareByFn");
var _crAdapterType = require("../crAdapterType1");
const crData = (json, option) => {
  const {
      _propName
    } = option,
    _data = [];
  json.forEach(item => {
    const _v = parseFloat(item[_propName]);
    if ((0, _AdapterFn.isNumber)(_v)) {
      _data.push([(0, _AdapterFn.ymdToUTC)(item.date), _v]);
    }
  });
  return _data.reverse().sort(_compareByFn.compareByDate);
};
const toChart = (0, _crAdapterType.crAdapterType1)({
  crData
});
var _default = exports.default = toChart;
//# sourceMappingURL=toChart.js.map