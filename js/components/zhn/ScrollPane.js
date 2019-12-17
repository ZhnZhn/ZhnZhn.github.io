"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _withThemeRef = _interopRequireDefault(require("../hoc/withThemeRef"));

var TH_ID = 'SCROLL_PANE';
var CL = 'with-scroll';

var ScrollPane =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(ScrollPane, _Component);

  function ScrollPane() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._refRootNode = function (node) {
      return _this.rootNode = node;
    };

    return _this;
  }

  var _proto = ScrollPane.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        theme = _this$props.theme,
        className = _this$props.className,
        style = _this$props.style,
        children = _this$props.children,
        TS = theme.getStyle(TH_ID),
        _cl = CL + " " + TS.CL_SCROLL + " " + className;

    return _react["default"].createElement("div", {
      ref: this._refRootNode,
      className: _cl,
      style: style
    }, children);
  };

  _proto.scrollTop = function scrollTop() {
    this.rootNode.scrollTop = 0;
  };

  return ScrollPane;
}(_react.Component);

ScrollPane.defaultProps = {
  className: ''
};

var _default = (0, _withThemeRef["default"])(ScrollPane);

exports["default"] = _default;
//# sourceMappingURL=ScrollPane.js.map