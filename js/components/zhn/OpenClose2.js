"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));

var _useKeyEnter = _interopRequireDefault(require("../hooks/useKeyEnter"));

var _useDnDHandlers = _interopRequireDefault(require("../hooks/useDnDHandlers"));

var _Svg = _interopRequireDefault(require("./svg/Svg"));

var _OpenCloseStyle = require("./OpenCloseStyle");

var _jsxRuntime = require("react/jsx-runtime");

const _crStyleConf = (isOpen, openColor, notSelectedStyle) => isOpen //_pathV, _fillV, _divStyle, _expClass, _notSelectedStyle
? [_OpenCloseStyle.PATH_OPEN, openColor, _OpenCloseStyle.S_BLOCK, _OpenCloseStyle.CL_OPEN_CLOSE_EXP + " " + _OpenCloseStyle.CL_SHOW_POPUP] : [_OpenCloseStyle.PATH_CLOSE, _OpenCloseStyle.FILL_CLOSE_COLOR, _OpenCloseStyle.S_NONE, _OpenCloseStyle.CL_OPEN_CLOSE_EXP, notSelectedStyle];

const OpenClose2 = props => {
  const {
    isInitialOpen,
    style,
    ocStyle,
    notSelectedStyle,
    captionStyle,
    caption,
    openColor,

    /*
    isDraggable,
    option,
    onDragStart,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop,
    */
    children
  } = props,
        [isOpen, toggleIsOpen] = (0, _useToggle.default)(isInitialOpen),
        _hKeyDown = (0, _useKeyEnter.default)(toggleIsOpen),
        _dragOption = (0, _useDnDHandlers.default)(props),
        [_pathV, _fillV, _divStyle, _expClass, _notSelectedStyle] = _crStyleConf(isOpen, openColor, notSelectedStyle);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: _OpenCloseStyle.CL_NOT_SELECTED,
    style: style,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      role: "menuitem",
      tabIndex: "0",
      className: _OpenCloseStyle.CL_OPEN_CLOSE,
      style: { ...ocStyle,
        ..._notSelectedStyle
      },
      onClick: toggleIsOpen,
      onKeyDown: _hKeyDown,
      ..._dragOption,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.default, {
        w: "16",
        style: _OpenCloseStyle.S_SVG,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
          d: _pathV,
          fill: _fillV,
          strokeWidth: "1",
          stroke: openColor
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: { ..._OpenCloseStyle.S_CAPTION,
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