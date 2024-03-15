"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _Color = require("../styles/Color");
var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));
var _fUseKey = require("../hooks/fUseKey");
var _Svg = _interopRequireDefault(require("./svg/Svg"));
var _jsxRuntime = require("react/jsx-runtime");
const S_ROOT_DIV = {
    lineHeight: 2
  },
  S_SVG = {
    display: 'inline-block',
    position: 'relative',
    top: 1
  },
  S_CAPTION = {
    paddingLeft: 4,
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer'
  },
  PATH_OPEN = "M 2,14 L 14,14 14,2 2,14",
  PATH_CLOSE = "M 2,2 L 14,8 2,14 2,2";

//_pathV, _fillV, _childCl, _childStyle
const _crConf = (isOpen, openColor) => isOpen ? [PATH_OPEN, openColor, _styleFn.CL_OPEN_CLOSE_EXP + " " + _styleFn.CL_SHOW_POPUP, _styleFn.S_BLOCK] : [PATH_CLOSE, _Color.TRANSPARENT_COLOR, _styleFn.CL_OPEN_CLOSE_EXP, _styleFn.S_NONE];
const OpenClose = _ref => {
  let {
    refItem,
    isClose = true,
    role = 'button',
    className,
    style,
    rowStyle,
    ocStyle,
    caption,
    captionStyle,
    openColor,
    CompAfter,
    childStyle,
    dndHandlers,
    children
  } = _ref;
  const _childrenWrapperId = (0, _uiApi.useId)(),
    [isOpen, toggleIsOpen] = (0, _useToggle.default)(!isClose),
    _hKeyDown = (0, _fUseKey.useKeyEnter)(toggleIsOpen),
    [_pathV, _fillV, _childCl, _childStyle] = _crConf(isOpen, openColor);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      ...S_ROOT_DIV,
      ...style
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: _styleFn.CL_NOT_SELECTED,
      style: rowStyle,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        ...dndHandlers,
        ref: refItem,
        "aria-expanded": isOpen,
        "aria-controls": _childrenWrapperId,
        tabIndex: "0",
        role: role,
        className: className || _styleFn.CL_OPEN_CLOSE,
        style: ocStyle,
        onClick: toggleIsOpen,
        onKeyDown: _hKeyDown,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.default, {
          w: "16",
          style: S_SVG,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
            fill: _fillV,
            strokeWidth: "1",
            stroke: openColor,
            d: _pathV
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: {
            ...S_CAPTION,
            ...captionStyle
          },
          children: caption
        })]
      }), CompAfter]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      id: _childrenWrapperId,
      className: _childCl,
      style: {
        ...childStyle,
        ..._childStyle
      },
      children: children
    })]
  });
};
var _default = exports.default = OpenClose;
//# sourceMappingURL=OpenClose.js.map