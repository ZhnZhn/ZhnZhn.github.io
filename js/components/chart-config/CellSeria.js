'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _RowInputColor = require('./RowInputColor');

var _RowInputColor2 = _interopRequireDefault(_RowInputColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  ROW_INPUT: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
};

var arrType = ['area', 'areaspline', 'line', 'spline', 'bar', 'column'];
var arrSymbol = ['circle', 'square', 'diamond', 'triangle', 'triangle-down'];

var _fnIsInArray = function _fnIsInArray(arr, value) {
  return arr.indexOf(value) !== -1 ? true : false;
};

var _fnIsValidColor = function _fnIsValidColor(color) {
  var el = document.createElement('div');
  el.style.color = color;
  //el.style.color.split(/\s+/).join('').toLowerCase()
  return el.style.color ? true : false;
};

var CellSeria = function (_Component) {
  (0, _inherits3.default)(CellSeria, _Component);

  function CellSeria() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, CellSeria);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CellSeria.__proto__ || Object.getPrototypeOf(CellSeria)).call.apply(_ref, [this].concat(args))), _this), _this._handleEnterType = function (value) {
      var _this$props = _this.props,
          _this$props$chart = _this$props.chart,
          chart = _this$props$chart === undefined ? {} : _this$props$chart,
          _this$props$seriaInde = _this$props.seriaIndex,
          seriaIndex = _this$props$seriaInde === undefined ? 0 : _this$props$seriaInde,
          seria = (0, _safeGet2.default)(chart, 'series[' + seriaIndex + ']', {}),
          seriaOptions = seria.options;


      if (seriaOptions && chart.addSeries && _fnIsInArray(arrType, value)) {

        seriaOptions.type = value;
        seria.update(seriaOptions);

        /*
        seria.remove(false);
        chart.addSeries(seriaOptions);
        */
      }
    }, _this._handleEnterColor = function (value) {
      var _this$props2 = _this.props,
          _this$props2$chart = _this$props2.chart,
          chart = _this$props2$chart === undefined ? {} : _this$props2$chart,
          _this$props2$seriaInd = _this$props2.seriaIndex,
          seriaIndex = _this$props2$seriaInd === undefined ? 0 : _this$props2$seriaInd,
          seriaIns = (0, _safeGet2.default)(chart, 'series[' + seriaIndex + ']', {}),
          seriaOptions = seriaIns.options;


      if (seriaOptions && chart.addSeries && _fnIsValidColor(value)) {
        seriaOptions.color = value;
        seriaIns.update(seriaOptions);
      }
    }, _this._handleEnterSymbol = function (value) {
      var _this$props3 = _this.props,
          _this$props3$chart = _this$props3.chart,
          chart = _this$props3$chart === undefined ? {} : _this$props3$chart,
          _this$props3$seriaInd = _this$props3.seriaIndex,
          seriaIndex = _this$props3$seriaInd === undefined ? 0 : _this$props3$seriaInd,
          seriaIns = (0, _safeGet2.default)(chart, 'series[' + seriaIndex + ']', {}),
          seriaOptions = seriaIns.options;


      if (seriaOptions && chart.addSeries && _fnIsInArray(arrSymbol, value)) {
        if (seriaOptions.marker) {
          seriaOptions.marker.symbol = value;
        } else {
          seriaOptions.marker = { symbol: value };
        }
        seriaIns.update(seriaOptions);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(CellSeria, [{
    key: 'render',
    value: function render() {
      var options = this.props.options,
          name = options.name,
          type = options.type,
          color = options.color,
          symbol = options.symbol;

      return _react2.default.createElement(
        _OpenClose2.default,
        { caption: name, isClose: true },
        _react2.default.createElement(_RowInputText2.default, {
          styleRoot: STYLE.ROW_INPUT,
          caption: 'Type:',
          initValue: type,
          onEnter: this._handleEnterType
        }),
        _react2.default.createElement(_RowInputColor2.default, {
          styleRoot: STYLE.ROW_INPUT,
          caption: 'Color:',
          initValue: color,
          onEnter: this._handleEnterColor
        }),
        _react2.default.createElement(_RowInputText2.default, {
          styleRoot: STYLE.ROW_INPUT,
          caption: 'Symbol:',
          initValue: symbol,
          onEnter: this._handleEnterSymbol
        })
      );
    }
  }]);
  return CellSeria;
}(_react.Component);

process.env.NODE_ENV !== "production" ? CellSeria.propTypes = {
  chart: _react.PropTypes.object,
  options: _react.PropTypes.shape({
    type: _react.PropTypes.string,
    color: _react.PropTypes.string,
    marker: _react.PropTypes.shape({
      symbol: _react.PropTypes.string
    })
  }),
  seriaIndex: _react.PropTypes.number
} : void 0;
exports.default = CellSeria;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\chart-config\CellSeria.js.map