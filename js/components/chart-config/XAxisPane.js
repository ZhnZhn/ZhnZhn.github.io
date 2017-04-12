'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _safeGet = require('../../utils/safeGet');

var _safeGet2 = _interopRequireDefault(_safeGet);

var _RowCheckBox = require('../dialogs/RowCheckBox');

var _RowCheckBox2 = _interopRequireDefault(_RowCheckBox);

var _RowInputText = require('./RowInputText');

var _RowInputText2 = _interopRequireDefault(_RowInputText);

var _Pane = require('./Pane.Style');

var _Pane2 = _interopRequireDefault(_Pane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CATEGORY_SERIA_PROPS = {
  xAxis: 'x-category',
  pointPlacement: 'between'
};
var CATEGORY_XAXIS_PROPS = {
  id: 'x-category',
  opposite: true,
  //tickPosition: 'inside',
  //tickmarkPlacement: 'on',
  tickmarkPlacement: 'between',
  tickLength: 0,
  labels: {
    y: -5
  }
};

var _crNextSeries = function _crNextSeries(series, seriaProps) {
  return series.map(function (seria) {
    var nextData = seria.data.map(function (point) {
      return point.y;
    });
    return (0, _extends3.default)({
      data: nextData,
      type: seria.options.type,
      color: seria.options.color
    }, seriaProps);
  });
};

var _crCategoryXAxis = function _crCategoryXAxis(arr, props) {
  return (0, _extends3.default)({}, props, {
    categories: arr
  });
};

var XAxisPane = function (_Component) {
  (0, _inherits3.default)(XAxisPane, _Component);

  function XAxisPane() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, XAxisPane);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = XAxisPane.__proto__ || Object.getPrototypeOf(XAxisPane)).call.apply(_ref, [this].concat(args))), _this), _this._handleToCategory = function (value) {
      var categories = ('' + value).split(','),
          _this$props$chart = _this.props.chart,
          chart = _this$props$chart === undefined ? {} : _this$props$chart,
          xAxis = (0, _safeGet2.default)(chart, 'xAxis[0]'),
          series = (0, _safeGet2.default)(chart, 'series', []),
          nextSeries = _crNextSeries(series, CATEGORY_SERIA_PROPS);


      xAxis.remove(false);
      chart.addAxis(_crCategoryXAxis(categories, CATEGORY_XAXIS_PROPS), true, true);
      nextSeries.forEach(function (seria) {
        chart.addSeries(seria, false);
      });
      chart.redraw();
    }, _this._handleEnterLabelsX = function (value) {
      var _this$props$chart2 = _this.props.chart,
          chart = _this$props$chart2 === undefined ? {} : _this$props$chart2,
          xAxis = (0, _safeGet2.default)(chart, 'xAxis[0]'),
          _n = parseInt(value, 10);

      if (!isNaN(_n) && isFinite(_n)) {
        xAxis.update({ labels: { x: _n } });
      }
    }, _this._handleOnTick = function (is) {
      var _this$props$chart3 = _this.props.chart,
          chart = _this$props$chart3 === undefined ? {} : _this$props$chart3,
          xAxis = (0, _safeGet2.default)(chart, 'xAxis[0]');

      xAxis.update({
        endOnTick: is,
        startOnTick: is
      });
    }, _this._handleEnterX = function (propName, value) {
      var _this$props$chart4 = _this.props.chart,
          chart = _this$props$chart4 === undefined ? {} : _this$props$chart4,
          year = parseInt(value, 10),
          ml = Date.UTC(year, 5, 1),
          xAxis = (0, _safeGet2.default)(chart, 'xAxis[0]');


      xAxis.update((0, _defineProperty3.default)({}, propName, ml));
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(XAxisPane, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: _Pane2.default.ROOT },
        _react2.default.createElement(_RowInputText2.default, {
          caption: 'ToCtgrs:',
          onEnter: this._handleToCategory
        }),
        _react2.default.createElement(_RowInputText2.default, {
          caption: 'labelsX:',
          initValue: '',
          onEnter: this._handleEnterLabelsX
        }),
        _react2.default.createElement(_RowCheckBox2.default, {
          caption: 'Not Start on tick',
          onCheck: this._handleOnTick.bind(null, false),
          onUnCheck: this._handleOnTick.bind(null, true)
        }),
        _react2.default.createElement(_RowInputText2.default, {
          caption: 'minX:',
          initValue: '',
          onEnter: this._handleEnterX.bind(null, 'min')
        }),
        _react2.default.createElement(_RowInputText2.default, {
          caption: 'maxX:',
          initValue: '',
          onEnter: this._handleEnterX.bind(null, 'max')
        })
      );
    }
  }]);
  return XAxisPane;
}(_react.Component);

process.env.NODE_ENV !== "production" ? XAxisPane.propTypes = {
  chart: _react.PropTypes.shape({
    xAxis: _react.PropTypes.arrayOf(_react.PropTypes.object),
    series: _react.PropTypes.arrayOf(_react.PropTypes.object)
  })
} : void 0;
exports.default = XAxisPane;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\chart-config\XAxisPane.js.map