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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _safeGet = require('../../utils/safeGet');

var _safeGet2 = _interopRequireDefault(_safeGet);

var _OpenClose = require('../zhn/OpenClose');

var _OpenClose2 = _interopRequireDefault(_OpenClose);

var _RowInputText = require('./RowInputText');

var _RowInputText2 = _interopRequireDefault(_RowInputText);

var _RowCheckBox = require('../dialogs/RowCheckBox');

var _RowCheckBox2 = _interopRequireDefault(_RowCheckBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  ROW_INPUT: {
    paddingTop: '0px',
    paddingBottom: '0px'
  },
  CAPTION: {
    width: '120px'
  },
  INPUT: {
    width: '210px'
  }
};

var CellYAxis = function (_Component) {
  (0, _inherits3.default)(CellYAxis, _Component);

  function CellYAxis() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, CellYAxis);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CellYAxis.__proto__ || Object.getPrototypeOf(CellYAxis)).call.apply(_ref, [this].concat(args))), _this), _this._getYAxisIns = function () {
      var _this$props = _this.props,
          _this$props$chart = _this$props.chart,
          chart = _this$props$chart === undefined ? {} : _this$props$chart,
          _this$props$axisIndex = _this$props.axisIndex,
          axisIndex = _this$props$axisIndex === undefined ? 0 : _this$props$axisIndex;

      return _this.yAxisIns = (0, _safeGet2.default)(chart, 'yAxis[' + axisIndex + ']', { update: function update() {} });
    }, _this._handleEnterNumber = function (propName, value) {
      var _nValue = parseFloat(value);
      if (!isNaN(_nValue) && isFinite(_nValue)) {
        _this._getYAxisIns().update((0, _defineProperty3.default)({}, propName, _nValue));
      }
    }, _this._handleEnterBool = function (propName, value) {
      _this._getYAxisIns().update((0, _defineProperty3.default)({}, propName, value));
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(CellYAxis, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          axisIndex = _props.axisIndex,
          options = _props.options,
          _options$maxPadding = options.maxPadding,
          maxPadding = _options$maxPadding === undefined ? '' : _options$maxPadding,
          _options$min = options.min,
          min = _options$min === undefined ? '' : _options$min,
          _options$minPadding = options.minPadding,
          minPadding = _options$minPadding === undefined ? '' : _options$minPadding,
          tickPixelInterval = options.tickPixelInterval,
          startOnTick = options.startOnTick;

      //console.log(options);

      return _react2.default.createElement(
        _OpenClose2.default,
        { caption: 'YAxis ' + axisIndex },
        _react2.default.createElement(_RowInputText2.default, {
          styleRoot: STYLE.ROW_INPUT,
          styleCaption: STYLE.CAPTION,
          styleInput: STYLE.INPUT,
          caption: 'maxPadding:',
          initValue: maxPadding,
          onEnter: this._handleEnterNumber.bind(null, 'maxPadding')
        }),
        _react2.default.createElement(_RowInputText2.default, {
          styleRoot: STYLE.ROW_INPUT,
          styleCaption: STYLE.CAPTION,
          styleInput: STYLE.INPUT,
          caption: 'min:',
          initValue: min,
          onEnter: this._handleEnterNumber.bind(null, 'min')
        }),
        _react2.default.createElement(_RowInputText2.default, {
          styleRoot: STYLE.ROW_INPUT,
          styleCaption: STYLE.CAPTION,
          styleInput: STYLE.INPUT,
          caption: 'minPadding:',
          initValue: minPadding,
          onEnter: this._handleEnterNumber.bind(null, 'mixPadding')
        }),
        _react2.default.createElement(_RowInputText2.default, {
          styleRoot: STYLE.ROW_INPUT,
          styleCaption: STYLE.CAPTION,
          styleInput: STYLE.INPUT,
          caption: 'tickInterval:',
          initValue: tickPixelInterval,
          onEnter: this._handleEnterNumber.bind(null, 'tickPixelInterval')
        }),
        _react2.default.createElement(_RowCheckBox2.default, {
          caption: 'Start on Tick',
          isChecked: startOnTick,
          onCheck: this._handleEnterBool.bind(null, 'startOnTick', true),
          onUnCheck: this._handleEnterBool.bind(null, 'startOnTick', false)
        })
      );
    }
  }]);
  return CellYAxis;
}(_react.Component);

process.env.NODE_ENV !== "production" ? CellYAxis.propTypes = {
  chart: _react.PropTypes.object,
  options: _react.PropTypes.shape({
    maxPadding: _react.PropTypes.number,
    min: _react.PropTypes.number,
    minPadding: _react.PropTypes.number,
    tickPixelInterval: _react.PropTypes.number,
    startOnTick: _react.PropTypes.bool
  }),
  axisIndex: _react.PropTypes.number
} : void 0;
exports.default = CellYAxis;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\chart-config\CellYAxis.js.map