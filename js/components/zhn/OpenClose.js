"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));
var _fUseKey = require("../hooks/fUseKey");
var _Svg = _interopRequireDefault(require("./svg/Svg"));
var _OpenCloseStyle = require("./OpenCloseStyle");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from 'prop-types'

const S_ROOT_DIV = {
  lineHeight: 2
};

//_pathV, _fillV, _childCl, _childStyle
const _crConf = (isOpen, openColor) => isOpen ? [_OpenCloseStyle.PATH_OPEN, openColor, `${_OpenCloseStyle.CL_OPEN_CLOSE_EXP} ${_OpenCloseStyle.CL_SHOW_POPUP}`, _OpenCloseStyle.S_BLOCK] : [_OpenCloseStyle.PATH_CLOSE, _OpenCloseStyle.FILL_CLOSE_COLOR, _OpenCloseStyle.CL_OPEN_CLOSE_EXP, _OpenCloseStyle.S_NONE];
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
    children
  } = _ref;
  const [isOpen, toggleIsOpen] = (0, _useToggle.default)(!isClose),
    _hKeyDown = (0, _fUseKey.useKeyEnter)(toggleIsOpen),
    [_pathV, _fillV, _childCl, _childStyle] = _crConf(isOpen, openColor);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      ...S_ROOT_DIV,
      ...style
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: _OpenCloseStyle.CL_NOT_SELECTED,
      style: rowStyle,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        ref: refItem,
        tabIndex: "0",
        role: role,
        className: className || _OpenCloseStyle.CL_OPEN_CLOSE,
        style: ocStyle,
        onClick: toggleIsOpen,
        onKeyDown: _hKeyDown,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.default, {
          w: "16",
          style: _OpenCloseStyle.S_SVG,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
            fill: _fillV,
            strokeWidth: "1",
            stroke: openColor,
            d: _pathV
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: {
            ..._OpenCloseStyle.S_CAPTION,
            ...captionStyle
          },
          children: caption
        })]
      }), CompAfter]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      "aria-expanded": isOpen,
      className: _childCl,
      style: {
        ...childStyle,
        ..._childStyle
      },
      children: children
    })]
  });
};

/*
OpenClose.propTypes = {
  isClose: PropTypes.bool,
  role: PropTypes.string
  style: PropTypes.object,
  rowStyle: PropTypes.object,
  ocStyle: PropTypes.object,
  caption: PropTypes.string,
  captionStyle: PropTypes.object,
  openColor: PropTypes.string,
  CompAfter: PropTypes.node,
  childStyle: PropTypes.object,
}
*/
var _default = exports.default = OpenClose;
//# sourceMappingURL=OpenClose.js.map