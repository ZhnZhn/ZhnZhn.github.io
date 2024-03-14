"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crConfigType = _interopRequireDefault(require("../../charts/crConfigType1"));
var _fnUtil = require("./fnUtil");
var _fnAdapter = require("./fnAdapter");
const _isArr = Array.isArray;
const _filterLeadingNulls = data => {
  const _len = data.length;
  let i = 0;
  for (i; i < _len; i++) {
    if (data[i][1] !== null) break;
  }
  let j = _len - 1;
  for (j; j > -1; j--) {
    if (data[j][1] !== null) break;
  }
  return data.slice(i, j + 1);
};
const _isReverse = data => data.length > 2 && data[0][0] > data[1][0];
const _checkOrder = data => _isReverse(data) ? data.reverse() : data;
const _isPerJanuary = label => (label || '').indexOf('per 1 January') !== -1;
const _fCrDataPoint = (values, hasPerJanuary) => (time, i) => {
  const _pIndex = time.length - 1,
    isP = time[_pIndex] === '*',
    _time = isP ? time.slice(0, _pIndex) : time,
    x = (0, _fnUtil.toUTC)(_time, hasPerJanuary),
    y = values[i] ? values[i].value : null;
  return isP ? [x, y, 'p'] : [x, y];
};
const _postProcessData = (0, _fnUtil.compose)(_filterLeadingNulls, _checkOrder);
const _toData = (values, times, hasPerJanuary) => {
  const _values = _isArr(values) ? values : [values],
    _crPoint = _fCrDataPoint(_values, hasPerJanuary);
  return _isArr(times) ? _postProcessData(times.map(_crPoint)) : [];
};
const crSplineConfig = (json, option) => {
  const [ds, values, times] = (0, _fnAdapter.crDsValuesTimes)(json, option),
    _hasPerJanuary = _isPerJanuary(ds.label),
    data = _toData(values, times, _hasPerJanuary),
    confOption = (0, _fnAdapter.crConfOption)(ds, option);
  return (0, _crConfigType.default)({
    option,
    data,
    confOption
  });
};
var _default = exports.default = crSplineConfig;
//# sourceMappingURL=toSpline.js.map