"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _CL = _interopRequireDefault(require("./CL"));

var S = {
  ARROW_CELL: {
    position: 'absolute',
    top: 10,
    right: 0,
    width: 35,
    paddingRight: 5,
    textAlign: 'center',
    verticalAlign: 'middle',
    cursor: 'pointer'
  },
  ARROW: {
    position: 'relative',
    top: 2,
    display: 'inline-block',
    height: 0,
    width: 0,
    borderColor: '#999 transparent transparent',
    borderStyle: 'solid',
    borderWidth: '10px 8px 4px'
  }
};
var C = {
  ANIMATION_CIRCLE: "circle infinite 1.25s linear",
  BORDER_COLOR: "#1b75bb transparent transparent"
};

var _getStyle = function _getStyle(ref) {
  return ref.current.style;
};

var ArrowCell = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var arrowStyle = _ref.arrowStyle,
      onClick = _ref.onClick;

  var _refArrowCell = (0, _react.useRef)(),
      _refArrow = (0, _react.useRef)();

  (0, _react.useImperativeHandle)(ref, function () {
    return {
      startAnimation: function startAnimation() {
        _getStyle(_refArrowCell).animation = C.ANIMATION_CIRCLE;
        _getStyle(_refArrow).borderColor = C.BORDER_COLOR;
      },
      stopAnimation: function stopAnimation() {
        _getStyle(_refArrowCell).animation = "";
      }
    };
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    ref: _refArrowCell,
    className: _CL["default"].BT_ARROW,
    style: S.ARROW_CELL,
    tabIndex: "-1",
    onClick: onClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      ref: _refArrow,
      style: (0, _extends2["default"])({}, S.ARROW, arrowStyle)
    })
  });
});
/*
ArrowCell.propTypes = {
 arrowStyle: PropTypes.object,
 onClick: PropTypes.func
}
*/

var _default = ArrowCell;
exports["default"] = _default;
//# sourceMappingURL=ArrowCell.js.map