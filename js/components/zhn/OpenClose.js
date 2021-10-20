"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _use = _interopRequireDefault(require("../hooks/use"));

var _Color = _interopRequireDefault(require("../styles/Color"));

var _Svg = _interopRequireDefault(require("./svg/Svg"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from 'prop-types'
const {
  useToggle,
  useKeyEnter
} = _use.default;
const CL_ROOT = 'zhn-oc',
      CL_SHOW_POPUP = 'show-popup',
      CL_NOT_SELECTED = 'not-selected',
      CL_OC_EXP = 'zhn-oc__exp',
      FILL_CLOSE_COLOR = _Color.default.BLANK,
      S_ROOT_DIV = {
  lineHeight: 2
},
      S_SVG = {
  display: 'inline-block',
  position: 'relative',
  top: 1,
  marginLeft: 8
},
      S_CAPTION = {
  paddingLeft: 4,
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer'
},
      S_BLOCK = {
  display: 'block'
},
      S_NONE = {
  display: 'none'
},
      PATH_OPEN = "M 2,14 L 14,14 14,2 2,14",
      PATH_CLOSE = "M 2,2 L 14,8 2,14 2,2";

const _crConf = ({
  isOpen,
  openColor
}) => isOpen ? {
  _pathV: PATH_OPEN,
  _fillV: openColor,
  _childCl: CL_OC_EXP + " " + CL_SHOW_POPUP,
  _childStyle: S_BLOCK
} : {
  _pathV: PATH_CLOSE,
  _fillV: FILL_CLOSE_COLOR,
  _childCl: CL_OC_EXP,
  _childStyle: S_NONE
};

const OpenClose = ({
  isClose = true,
  role = 'button',
  style,
  rowStyle,
  ocStyle,
  caption,
  captionStyle,
  openColor,
  CompAfter,
  childStyle,
  children
}) => {
  const [isOpen, toggleIsOpen] = useToggle(!isClose),
        _hKeyDown = useKeyEnter(toggleIsOpen),
        {
    _pathV,
    _fillV,
    _childCl,
    _childStyle
  } = _crConf({
    isOpen,
    openColor
  });

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: { ...S_ROOT_DIV,
      ...style
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: CL_NOT_SELECTED,
      style: rowStyle,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        tabIndex: "0",
        role: role,
        className: CL_ROOT,
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
          style: { ...S_CAPTION,
            ...captionStyle
          },
          children: caption
        })]
      }), CompAfter]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      "aria-expanded": isOpen,
      className: _childCl,
      style: { ...childStyle,
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
  ocStyle: PropTypes.object,
  caption: PropTypes.string,
  captionStyle: PropTypes.object,
  openColor: PropTypes.string,
  CompAfter: PropTypes.node,
  childStyle: PropTypes.object,
}
*/


var _default = OpenClose;
exports.default = _default;
//# sourceMappingURL=OpenClose.js.map