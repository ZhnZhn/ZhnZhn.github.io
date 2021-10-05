"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _use = _interopRequireDefault(require("../hooks/use"));

var _Color = _interopRequireDefault(require("../styles/Color"));

var _Svg = _interopRequireDefault(require("./svg/Svg"));

var _jsxRuntime = require("react/jsx-runtime");

const {
  useToggle,
  useKeyEnter
} = _use.default;
const CL_SHOW = 'show-popup',
      CL_NOT_SELECTED = 'not-selected zhn-oc',
      CL_OC_EXP = 'zhn-oc__exp',
      FILL_CLOSE_COLOR = _Color.default.BLANK,
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

const _crStyleConf = ({
  isOpen,
  openColor,
  notSelectedStyle
}) => isOpen ? {
  _pathV: PATH_OPEN,
  _fillV: openColor,
  _divStyle: S_BLOCK,
  _expClass: CL_OC_EXP + " " + CL_SHOW,
  _notSelectedStyle: null
} : {
  _pathV: PATH_CLOSE,
  _fillV: FILL_CLOSE_COLOR,
  _divStyle: S_NONE,
  _expClass: CL_OC_EXP,
  _notSelectedStyle: notSelectedStyle
};

const OpenClose2 = ({
  isInitialOpen,
  style,
  ocStyle,
  notSelectedStyle,
  captionStyle,
  caption,
  openColor,
  isDraggable,
  option,
  onDragStart,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop,
  children
}) => {
  const [isOpen, toggleIsOpen] = useToggle(isInitialOpen),
        _hKeyDown = useKeyEnter(toggleIsOpen),
        _dragOption = isDraggable ? {
    draggable: true,
    onDragStart: onDragStart.bind(null, option),
    onDrop: onDrop.bind(null, option),
    onDragEnter,
    onDragOver,
    onDragLeave
  } : void 0,
        {
    _pathV,
    _fillV,
    _divStyle,
    _expClass,
    _notSelectedStyle
  } = _crStyleConf({
    isOpen,
    openColor,
    notSelectedStyle
  });

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: style,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      role: "menuitem",
      tabIndex: "0",
      className: CL_NOT_SELECTED,
      style: { ...ocStyle,
        ..._notSelectedStyle
      },
      onClick: toggleIsOpen,
      onKeyDown: _hKeyDown,
      ..._dragOption,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.default, {
        w: "16",
        style: S_SVG,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
          d: _pathV,
          fill: _fillV,
          strokeWidth: "1",
          stroke: openColor
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: { ...S_CAPTION,
          ...captionStyle
        },
        children: caption
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      "aria-expanded": isOpen,
      className: _expClass,
      style: _divStyle,
      children: children
    })]
  });
};

var _default = OpenClose2;
exports.default = _default;
//# sourceMappingURL=OpenClose2.js.map