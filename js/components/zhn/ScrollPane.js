"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ScrollPane = function (_Component) {
  (0, _inherits3.default)(ScrollPane, _Component);

  function ScrollPane() {
    (0, _classCallCheck3.default)(this, ScrollPane);
    return (0, _possibleConstructorReturn3.default)(this, (ScrollPane.__proto__ || Object.getPrototypeOf(ScrollPane)).apply(this, arguments));
  }

  (0, _createClass3.default)(ScrollPane, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          style = _props.style,
          _props$className = _props.className,
          className = _props$className === undefined ? "" : _props$className,
          children = _props.children;

      return _react2.default.createElement(
        "div",
        {
          ref: function ref(node) {
            return _this2.rootNode = node;
          },
          className: "with-scroll " + className,
          style: style
        },
        children
      );
    }
  }, {
    key: "scrollTop",
    value: function scrollTop() {
      this.rootNode.scrollTop = 0;
    }
  }]);
  return ScrollPane;
}(_react.Component);

exports.default = ScrollPane;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\ScrollPane.js.map