"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ScrollPane = _react2.default.createClass({
  displayName: "ScrollPane",
  render: function render() {
    var _props = this.props;
    var style = _props.style;
    var _props$className = _props.className;
    var className = _props$className === undefined ? "" : _props$className;
    var children = _props.children;

    return _react2.default.createElement(
      "div",
      { className: "with-scroll " + className, style: style },
      children
    );
  }
});

exports.default = ScrollPane;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\ScrollPane.js.map