'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    borderColor: '#999 transparent transparent',
    borderStyle: 'solid',
    borderWidth: '5px 5px 2.5px',
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
  _inherits(ArrowCell, _Component);

  function ArrowCell() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ArrowCell);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ArrowCell.__proto__ || Object.getPrototypeOf(ArrowCell)).call.apply(_ref, [this].concat(args))), _this), _this.startAnimation = function () {
      _this.arrowCell.style.animation = C.ANIMATION_CIRCLE;
      _this.arrow.style.borderColor = C.BORDER_COLOR;
    }, _this.stopAnimation = function () {
      _this.arrowCell.style.animation = "";
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ArrowCell, [{
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