'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var CellColor = function (_Component) {
  (0, _inherits3.default)(CellColor, _Component);

  function CellColor() {
    (0, _classCallCheck3.default)(this, CellColor);
    return (0, _possibleConstructorReturn3.default)(this, (CellColor.__proto__ || Object.getPrototypeOf(CellColor)).apply(this, arguments));
  }

  (0, _createClass3.default)(CellColor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var onReg = this.props.onReg;

      if (typeof onReg === 'function') {
        onReg(this.cellNode);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          style = _props.style,
          color = _props.color,
          onClick = _props.onClick,
          children = _props.children,
          _styleColor = color ? { backgroundColor: color } : undefined;

      return _react2.default.createElement(
        'span',
        {
          style: (0, _extends3.default)({}, style, _styleColor),
          ref: function ref(node) {
            return _this2.cellNode = node;
          },
          onClick: onClick
        },
        children
      );
    }
  }]);
  return CellColor;
}(_react.Component);

exports.default = CellColor;
//# sourceMappingURL=CellColor.js.map