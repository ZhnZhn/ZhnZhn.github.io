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

var _InputText = require('../zhn/InputText');

var _InputText2 = _interopRequireDefault(_InputText);

var _SvgPlus = require('../zhn/SvgPlus');

var _SvgPlus2 = _interopRequireDefault(_SvgPlus);

var _SvgMinus = require('../zhn/SvgMinus');

var _SvgMinus2 = _interopRequireDefault(_SvgMinus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addSmaTo = _IndicatorBuilder2.default.addSmaTo,
    removeSeriaFrom = _IndicatorBuilder2.default.removeSeriaFrom;


var S = {
  CAPTION: {
    display: 'inline-block',
    color: 'black',
    width: 48,
    fontWeight: 'bold'
  },
  INPUT_TEXT: {
    width: 56
  },
  ROW: {
    paddingTop: 5
  },
  fnSpan: function fnSpan(color) {
    return {
      color: color, paddingLeft: 8
    };
  }
};

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
      setSmaConfs = _useState2[1];

  var _onAddSma = function _onAddSma() {
    var period = _refPeriod.current.getValue(),
        id = _crId(period);

    if (!_isInArrObjWithId(smaConfs, id)) {
      var chart = getChart(),
          color = addSmaTo(chart, {
        id: id, period: period, isPlus: false
      });
      if (color) {
        smaConfs.push({ id: id, color: color });
        setSmaConfs([].concat((0, _toConsumableArray3.default)(smaConfs)));
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

  var _renderConfigs = function _renderConfigs(confs) {
    var _confEls = confs.map(function (conf) {
      var id = conf.id,
          color = conf.color;

      return _react2.default.createElement(
        'div',
        { key: id, style: S.ROW },
        _react2.default.createElement(_SvgMinus2.default, {
          onClick: _onRemoveSma.bind(null, id)
        }),
        _react2.default.createElement(
          'span',
          { style: S.fnSpan(color) },
          id
        )
      );
    });
    return _react2.default.createElement(
      'div',
      null,
      _confEls
    );
  };
  return _react2.default.createElement(
    _react2.default.Fragment,
    null,
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'span',
        { style: S.CAPTION },
        'SMA'
      ),
      _react2.default.createElement(_InputText2.default, {
        ref: _refPeriod,
        type: 'number',
        style: S.INPUT_TEXT,
        initValue: _initialSma,
        onEnter: _onAddSma
      }),
      _react2.default.createElement(_SvgPlus2.default, { onClick: _onAddSma })
    ),
    _renderConfigs(smaConfs)
  );
};

exports.default = RowSma;
//# sourceMappingURL=RowSma.js.map