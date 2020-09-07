"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _tpSpline = _interopRequireDefault(require("./tp/tpSpline"));

var _tpCategory = _interopRequireDefault(require("./tp/tpCategory"));

var _tpScatter = _interopRequireDefault(require("./tp/tpScatter"));

var _tpStock = _interopRequireDefault(require("./tp/tpStock"));

var _tpSpark = _interopRequireDefault(require("./tp/tpSpark"));

var _tpTreeMap = _interopRequireDefault(require("./tp/tpTreeMap"));

var _tpDonut = _interopRequireDefault(require("./tp/tpDonut"));

var _tpFn = _interopRequireDefault(require("./tp/tpFn"));

var crTpId = _tpFn["default"].crTpId,
    toNumberFormat = _tpFn["default"].toNumberFormat,
    toDmy = _tpFn["default"].toDmy,
    addHideHandler = _tpFn["default"].addHideHandler;

var _fnAddHandlerClose = function _fnAddHandlerClose(id, point) {
  setTimeout(function () {
    return addHideHandler(id, point);
  }, 1);
};

var _fFormatter = function _fFormatter(option) {
  return function () {
    var fnTemplate = option.fnTemplate,
        _option$onAfterRender = option.onAfterRender,
        onAfterRender = _option$onAfterRender === void 0 ? _fnAddHandlerClose : _option$onAfterRender,
        _option$fnDateFormat = option.fnDateFormat,
        fnDateFormat = _option$fnDateFormat === void 0 ? toDmy : _option$fnDateFormat,
        isWithColor = option.isWithColor,
        isWithValueText = option.isWithValueText,
        isWithValue = option.isWithValue,
        point = this,
        series = point.series,
        date = fnDateFormat(point.x),
        color = isWithColor ? point.color || series.color : void 0,
        _series$userOptions = series.userOptions,
        zhValueText = _series$userOptions.zhValueText,
        _series$userOptions$n = _series$userOptions.name,
        name = _series$userOptions$n === void 0 ? 'Value' : _series$userOptions$n,
        _id = crTpId(),
        valueText = isWithValueText ? zhValueText || name : 'Value',
        value = isWithValue ? toNumberFormat(point.y) : null;

    onAfterRender(_id, point);
    return fnTemplate({
      id: _id,
      date: date,
      color: color,
      valueText: valueText,
      value: value,
      point: point
    });
  };
};

var Tooltip = {
  vDmy: _fFormatter((0, _extends2["default"])({}, _tpSpline["default"].vDmy)),
  vTdmyIf: _fFormatter((0, _extends2["default"])({}, _tpSpline["default"].vTdmyIf)),
  vTdmy: _fFormatter((0, _extends2["default"])({}, _tpSpline["default"].vTdmy)),
  categorySimple: _fFormatter((0, _extends2["default"])({}, _tpCategory["default"].simple)),
  category: _fFormatter((0, _extends2["default"])({}, _tpCategory["default"].remove)),
  categoryRHLY: _fFormatter((0, _extends2["default"])({}, _tpCategory["default"].rhly)),
  exDividend: _fFormatter((0, _extends2["default"])({}, _tpScatter["default"].exDividend)),
  splitRatio: _fFormatter((0, _extends2["default"])({}, _tpScatter["default"].splitRatio)),
  exValue: _fFormatter((0, _extends2["default"])({}, _tpScatter["default"].exValue)),
  eps: _fFormatter((0, _extends2["default"])({}, _tpScatter["default"].eps)),
  volume: _fFormatter((0, _extends2["default"])({}, _tpStock["default"].volume)),
  volumeTdmy: _fFormatter((0, _extends2["default"])({}, _tpStock["default"].volumeTdmy)),
  ath: _fFormatter((0, _extends2["default"])({}, _tpStock["default"].ath)),
  hl: _fFormatter((0, _extends2["default"])({}, _tpStock["default"].hl)),
  donut: _fFormatter((0, _extends2["default"])({}, _tpDonut["default"].value)),
  sparkStackedArea: _fFormatter((0, _extends2["default"])({}, _tpSpark["default"].stackedArea)),
  sparkTreeMap: _fFormatter((0, _extends2["default"])({}, _tpSpark["default"].treeMap)),
  treeMap: _fFormatter((0, _extends2["default"])({}, _tpTreeMap["default"].value))
};
var _default = Tooltip;
exports["default"] = _default;
//# sourceMappingURL=Tooltip.js.map