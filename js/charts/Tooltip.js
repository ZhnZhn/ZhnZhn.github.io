'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _ChartFn = require('./ChartFn');

var _ChartFn2 = _interopRequireDefault(_ChartFn);

var _tpSpline = require('./tp/tpSpline');

var _tpSpline2 = _interopRequireDefault(_tpSpline);

var _tpCategory = require('./tp/tpCategory');

var _tpCategory2 = _interopRequireDefault(_tpCategory);

var _tpScatter = require('./tp/tpScatter');

var _tpScatter2 = _interopRequireDefault(_tpScatter);

var _tpStock = require('./tp/tpStock');

var _tpStock2 = _interopRequireDefault(_tpStock);

var _tpSpark = require('./tp/tpSpark');

var _tpSpark2 = _interopRequireDefault(_tpSpark);

var _tpTreeMap = require('./tp/tpTreeMap');

var _tpTreeMap2 = _interopRequireDefault(_tpTreeMap);

var _tpDonut = require('./tp/tpDonut');

var _tpDonut2 = _interopRequireDefault(_tpDonut);

var _tpFn = require('./tp/tpFn');

var _tpFn2 = _interopRequireDefault(_tpFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crTpId = _ChartFn2.default.crTpId,
    toNumberFormat = _ChartFn2.default.toNumberFormat,
    toDateFormatDMY = _ChartFn2.default.toDateFormatDMY;
var addHideHandler = _tpFn2.default.addHideHandler;


var _fnAddHandlerClose = function _fnAddHandlerClose(id, point) {
  setTimeout(function () {
    return addHideHandler(id, point);
  }, 1);
};

var _fFormatter = function _fFormatter(option) {
  return function () {
    var fnTemplate = option.fnTemplate,
        _option$onAfterRender = option.onAfterRender,
        onAfterRender = _option$onAfterRender === undefined ? _fnAddHandlerClose : _option$onAfterRender,
        _option$fnDateFormat = option.fnDateFormat,
        fnDateFormat = _option$fnDateFormat === undefined ? toDateFormatDMY : _option$fnDateFormat,
        isWithColor = option.isWithColor,
        isWithValueText = option.isWithValueText,
        isWithValue = option.isWithValue,
        point = this,
        series = point.series,
        date = fnDateFormat(point.x),
        color = isWithColor ? point.color || series.color : undefined,
        _series$userOptions = series.userOptions,
        zhValueText = _series$userOptions.zhValueText,
        _series$userOptions$n = _series$userOptions.name,
        name = _series$userOptions$n === undefined ? 'Value' : _series$userOptions$n,
        _id = crTpId(),
        valueText = isWithValueText ? zhValueText || name : 'Value',
        value = isWithValue ? toNumberFormat(point.y) : null;

    onAfterRender(_id, point);

    return fnTemplate({
      id: _id,
      date: date, color: color,
      valueText: valueText, value: value,
      point: point
    });
  };
};

var Tooltip = {
  fnBasePointFormatter: _fFormatter((0, _extends3.default)({}, _tpSpline2.default.value)),
  fnBasePointFormatterT: _fFormatter((0, _extends3.default)({}, _tpSpline2.default.valueDmyt)),

  categorySimple: _fFormatter((0, _extends3.default)({}, _tpCategory2.default.simple)),
  category: _fFormatter((0, _extends3.default)({}, _tpCategory2.default.remove)),
  categoryRHLY: _fFormatter((0, _extends3.default)({}, _tpCategory2.default.rhly)),

  exDividend: _fFormatter((0, _extends3.default)({}, _tpScatter2.default.exDividend)),
  splitRatio: _fFormatter((0, _extends3.default)({}, _tpScatter2.default.splitRatio)),
  exValue: _fFormatter((0, _extends3.default)({}, _tpScatter2.default.exValue)),
  eps: _fFormatter((0, _extends3.default)({}, _tpScatter2.default.eps)),

  volume: _fFormatter((0, _extends3.default)({}, _tpStock2.default.volume)),
  volumeDmyt: _fFormatter((0, _extends3.default)({}, _tpStock2.default.volumeDmyt)),
  ath: _fFormatter((0, _extends3.default)({}, _tpStock2.default.ath)),
  hl: _fFormatter((0, _extends3.default)({}, _tpStock2.default.hl)),

  donut: _fFormatter((0, _extends3.default)({}, _tpDonut2.default.value)),

  sparkStackedArea: _fFormatter((0, _extends3.default)({}, _tpSpark2.default.stackedArea)),
  sparkTreeMap: _fFormatter((0, _extends3.default)({}, _tpSpark2.default.treeMap)),

  treeMap: _fFormatter((0, _extends3.default)({}, _tpTreeMap2.default.value))
};

exports.default = Tooltip;
//# sourceMappingURL=Tooltip.js.map