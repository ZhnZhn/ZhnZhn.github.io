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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  ARROW_CELL: {
    position: 'absolute',
    top: '10px',
    right: '0px',
    cursor: 'pointer',
    textAlign: 'center',
    verticalAlign: 'middle',
    width: '35px',
    paddingRight: '5px'
  },
  ARROW: {
    position: 'relative',
    top: '2px',
    borderColor: '#999 transparent transparent',
    borderStyle: 'solid',
    //borderWidth: '5px 5px 2.5px',
    borderWidth: '10px 8px 4px',
    display: 'inline-block',
    height: '0px',
    width: '0px'
  }
};

var C = {
  ANIMATION_CIRCLE: "circle infinite 1.25s linear",
  BORDER_COLOR: "rgb(27, 117, 187) transparent transparent"
};

var ArrowCell = function (_Component) {
  (0, _inherits3.default)(ArrowCell, _Component);

  function ArrowCell() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ArrowCell);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ArrowCell.__proto__ || Object.getPrototypeOf(ArrowCell)).call.apply(_ref, [this].concat(args))), _this), _this.startAnimation = function () {
      _this.arrowCell.style.animation = C.ANIMATION_CIRCLE;
      _this.arrow.style.borderColor = C.BORDER_COLOR;
    }, _this.stopAnimation = function () {
      _this.arrowCell.style.animation = "";
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ArrowCell, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          styleArrow = _props.styleArrow,
          onClick = _props.onClick;

      return _react2.default.createElement(
        'span',
        {
          ref: function ref(c) {
            return _this2.arrowCell = c;
          },
          style: STYLE.ARROW_CELL,
          onClick: onClick },
        _react2.default.createElement('span', {
          ref: function ref(c) {
            return _this2.arrow = c;
          },
          style: Object.assign({}, STYLE.ARROW, styleArrow)
        })
      );
    }
  }]);
  return ArrowCell;
}(_react.Component);

exports.default = ArrowCell;
//# sourceMappingURL=ArrowCell.js.map