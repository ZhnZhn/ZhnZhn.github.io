"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _useRefInit = _interopRequireDefault(require("../hooks/useRefInit"));

var _IndicatorBuilder = _interopRequireDefault(require("../../charts/IndicatorBuilder"));

var _RowCaptionInput = _interopRequireDefault(require("./RowCaptionInput"));

var _SeriaConfigs = _interopRequireDefault(require("./SeriaConfigs"));

var addSmaTo = _IndicatorBuilder["default"].addSmaTo,
    removeSeriaFrom = _IndicatorBuilder["default"].removeSeriaFrom;
var _isArray = Array.isArray;
var SMA = {
  MONTH: '12',
  YEAR: '50'
};

var _findInitSma = function _findInitSma(config) {
  var _d = (((config || {}).series || [])[0] || {}).data;
  return !_isArray(_d) ? '0' : _d.length > 150 ? SMA.YEAR : SMA.MONTH;
};

var _isInArrObjWithId = function _isInArrObjWithId(arrObj, id) {
  return !!arrObj.find(function (obj) {
    return obj.id === id;
  });
};

var _crId = function _crId(period) {
  return "SMA(" + period + ")";
};

var RowSma = function RowSma(_ref) {
  var config = _ref.config,
      getChart = _ref.getChart;

  var _refInitialSma = (0, _react.useRef)(null),
      _initialSma = (0, _useRefInit["default"])(_refInitialSma, function () {
    return _findInitSma(config);
  }),
      _refPeriod = (0, _react.useRef)(),
      _useState = (0, _react.useState)([]),
      smaConfs = _useState[0],
      setSmaConfs = _useState[1],
      _onAddSma = function _onAddSma() {
    var period = _refPeriod.current.getValue(),
        id = _crId(period);

    if (!_isInArrObjWithId(smaConfs, id)) {
      var chart = getChart(),
          color = addSmaTo(chart, {
        id: id,
        period: period,
        isPlus: false
      });

      if (color) {
        setSmaConfs([].concat(smaConfs, [{
          id: id,
          color: color
        }]));
      }
    }
  },
      _onRemoveSma = function _onRemoveSma(id) {
    var chart = getChart();

    if (removeSeriaFrom(chart, id)) {
      setSmaConfs(smaConfs.filter(function (d) {
        return d.id !== id;
      }));
    }
  };

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_RowCaptionInput["default"], {
    caption: "SMA",
    forwardRef: _refPeriod,
    initValue: _initialSma,
    onAdd: _onAddSma
  }), _react["default"].createElement(_SeriaConfigs["default"], {
    configs: smaConfs,
    onRemove: _onRemoveSma
  }));
};

var _default = RowSma;
exports["default"] = _default;
//# sourceMappingURL=RowSma.js.map