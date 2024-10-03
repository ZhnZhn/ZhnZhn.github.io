"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ChartType = require("../../constants/ChartType");
var _crConfigType = _interopRequireDefault(require("../../charts/crConfigType1"));
var _JsonStatFn = require("../JsonStatFn");
var _fnAdapter = require("./fnAdapter");
var _toYearly = _interopRequireDefault(require("./toYearly"));
const _isReverse = data => data.length > 2 && data[0][0] > data[1][0];
const _checkTimeOrder = data => _isReverse(data) ? data.reverse() : data;
const _isPerJanuary = label => (label || '').indexOf('per 1 January') !== -1;
const _crData = json => _checkTimeOrder((0, _JsonStatFn.crSplineData)(json, _isPerJanuary((0, _JsonStatFn.getDatasetLabel)(json))));
const _crSplineConfig = (json, option) => {
  const data = _crData(json),
    confOption = (0, _fnAdapter.crConfOption)(option, json);
  return (0, _crConfigType.default)({
    option,
    data,
    confOption
  });
};
const routerSplineConfig = {
  DF: _crSplineConfig,
  [_ChartType.CHT_AREA]: _crSplineConfig,
  [_ChartType.CHT_SPLINE]: _crSplineConfig,
  [_ChartType.CHT_COLUMN]: _crSplineConfig,
  [_ChartType.CHT_AREA_YEARLY]: _toYearly.default
};
var _default = exports.default = routerSplineConfig;
//# sourceMappingURL=toSpline.js.map