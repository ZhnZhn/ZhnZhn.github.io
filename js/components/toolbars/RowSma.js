'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _useRefInit = require('../hooks/useRefInit');

var _useRefInit2 = _interopRequireDefault(_useRefInit);

var _IndicatorBuilder = require('../../charts/IndicatorBuilder');

var _IndicatorBuilder2 = _interopRequireDefault(_IndicatorBuilder);

var _RowCaptionInput = require('./RowCaptionInput');

var _RowCaptionInput2 = _interopRequireDefault(_RowCaptionInput);

var _SeriaConfigs = require('./SeriaConfigs');

var _SeriaConfigs2 = _interopRequireDefault(_SeriaConfigs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addSmaTo = _IndicatorBuilder2.default.addSmaTo,
    removeSeriaFrom = _IndicatorBuilder2.default.removeSeriaFrom;


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
  return 'SMA(' + period + ')';
};

var RowSma = function RowSma(_ref) {
  var config = _ref.config,
      getChart = _ref.getChart;
  var _refInitialSma = (0, _react.useRef)(null),
      _initialSma = (0, _useRefInit2.default)(_refInitialSma, function () {
    return _findInitSma(config);
  }),
      _refPeriod = (0, _react.useRef)(),
      _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      smaConfs = _useState2[0],
      setSmaConfs = _useState2[1],
      _onAddSma = function _onAddSma() {
    var period = _refPeriod.current.getValue(),
        id = _crId(period);
    if (!_isInArrObjWithId(smaConfs, id)) {
      var chart = getChart(),
          color = addSmaTo(chart, {
        id: id, period: period, isPlus: false
      });
      if (color) {
        setSmaConfs([].concat((0, _toConsumableArray3.default)(smaConfs), [{ id: id, color: color }]));
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


  return _react2.default.createElement(
    _react2.default.Fragment,
    null,
    _react2.default.createElement(_RowCaptionInput2.default, {
      caption: 'SMA',
      forwardRef: _refPeriod,
      initValue: _initialSma,
      onAdd: _onAddSma
    }),
    _react2.default.createElement(_SeriaConfigs2.default, {
      configs: smaConfs,
      onRemove: _onRemoveSma
    })
  );
};

exports.default = RowSma;
//# sourceMappingURL=RowSma.js.map