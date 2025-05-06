"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _a11yFn = require("../a11yFn");
var _styleFn = require("../styleFn");
var _useToggle = require("../hooks/useToggle");
var _fUseKey = require("../hooks/fUseKey");
var _Svg = require("./svg/Svg");
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
const _crConf = (isOpen, openColor) => isOpen ? [PATH_OPEN, openColor, `${_styleFn.CL_OPEN_CLOSE_EXP} ${_styleFn.CL_SHOW_POPUP}`, _styleFn.S_BLOCK] : [PATH_CLOSE, _Svg.FILL_NONE, _styleFn.CL_OPEN_CLOSE_EXP, _styleFn.S_NONE];
const OpenClose = props => {
  const _childrenWrapperId = (0, _uiApi.useId)(),
    [isOpen, toggleIsOpen] = (0, _useToggle.useToggle)(!(props.isClose ?? true)),
    _hKeyDown = (0, _fUseKey.useKeyEnter)(toggleIsOpen),
    [_pathV, _fillV, _childCl, _childStyle] = _crConf(isOpen, props.openColor);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      ...S_ROOT_DIV,
      ...props.style
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: _styleFn.CL_NOT_SELECTED,
      style: props.rowStyle,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        ...props.dndHandlers,
        ...(0, _a11yFn.crAriaExpandedProps)(isOpen, _childrenWrapperId),
        role: props.role || "button",
        tabIndex: "0",
        ref: props.refItem,
        className: props.className || _styleFn.CL_OPEN_CLOSE,
        style: props.ocStyle,
        onClick: toggleIsOpen,
        onKeyDown: _hKeyDown,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.Svg, {
          w: "16",
          style: S_SVG,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
            fill: _fillV,
            strokeWidth: "1",
            stroke: props.openColor,
            d: _pathV
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          id: props.labelId,
          style: {
            ...S_CAPTION,
            ...props.captionStyle
          },
          children: props.caption
        })]
      }), props.CompAfter]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      id: _childrenWrapperId,
      className: _childCl,
      style: {
        ...props.childStyle,
        ..._childStyle
      },
      children: props.children
    })]
  });
};
var _default = exports.default = OpenClose;
//# sourceMappingURL=OpenClose.js.map