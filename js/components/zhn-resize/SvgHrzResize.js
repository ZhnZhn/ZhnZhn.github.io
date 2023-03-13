"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useResizeElement = _interopRequireDefault(require("./useResizeElement"));
var _BtResize = _interopRequireDefault(require("./BtResize"));
var _jsxRuntime = require("react/jsx-runtime");
const S_ROOT_DIV = {
    display: 'inline-block'
  },
  S_BT_LEFT = {
    marginLeft: 10
  },
  S_BT_RIGHT = {
    marginLeft: 10,
    transform: 'rotate(180deg)'
  };
const SvgHrzResize = (0, _uiApi.forwardRef)((props, ref) => {
  const [hStartResizeLeft, hStartResizeRight, hStopResize, hKdLeft, hKdRight] = (0, _useResizeElement.default)(props, ref);
  return props.isBts ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_ROOT_DIV,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BtResize.default, {
      style: S_BT_LEFT,
      title: "Resize container to left",
      startResize: hStartResizeLeft,
      stopResize: hStopResize,
      onKeyDown: hKdLeft
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_BtResize.default, {
      style: S_BT_RIGHT,
      title: "Resize container to right",
      startResize: hStartResizeRight,
      stopResize: hStopResize,
      onKeyDown: hKdRight
    })]
  }) : null;
});

/*
SvgHrzResize.propTypes = {
  nodeRef: PropTypes.ref,
  isBts: PropTypes.bool,
  initWidth: PropTypes.number,
  minWidth: PropTypes.number,
  maxWidth: PropTypes.number,
  step: PropTypes.number,
  onResizeAfter: PropTypes.func
}
*/
var _default = SvgHrzResize;
exports.default = _default;
//# sourceMappingURL=SvgHrzResize.js.map