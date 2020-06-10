"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ThemeContext = _interopRequireDefault(require("../hoc/ThemeContext"));

var TH_ID = 'SCROLL_PANE';
var CL = 'with-scroll';

var ScrollPane = function ScrollPane(_ref) {
  var innerRef = _ref.innerRef,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      style = _ref.style,
      children = _ref.children;

  var theme = (0, _react.useContext)(_ThemeContext["default"]),
      TS = theme.getStyle(TH_ID),
      _cl = CL + " " + TS.CL_SCROLL + " " + className;

  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: innerRef,
    className: _cl,
    style: style
  }, children);
};

var _default = ScrollPane;
exports["default"] = _default;
//# sourceMappingURL=ScrollPane.js.map