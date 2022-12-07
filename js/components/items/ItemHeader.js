"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _jsxRuntime = require("react/jsx-runtime");

const TH_ID = 'ELEMENT',
      CL_CAPTION = "not-selected text-clip bt-left bt",
      S_ROOT = {
  position: 'relative',
  backgroundColor: '#1b2836',
  height: 'auto',
  width: '100%',
  padding: '6px 42px 6px 10px',
  borderTopRightRadius: 2,
  borderBottomRightRadius: 2
},
      S_CAPTION = {
  width: '75%',
  padding: '4px 2px 2px 0'
},
      S_OPEN = {
  color: '#a487d4'
},
      S_CLOSE = {
  color: 'gray'
},
      S_SVG_CLOSE = {
  position: 'absolute',
  right: 0,
  top: 4
},
      MAX_LENGTH = 45,
      _crTitle = (title, caption) => title || caption.length > MAX_LENGTH ? caption : void 0;

function ItemHeader(_ref) {
  let {
    isOpen,
    style,
    captionStyle,
    caption = '',
    title,
    children,
    onClick,
    onClose
  } = _ref;

  const TS = (0, _useTheme.default)(TH_ID),
        _title = _crTitle(title, caption),
        _captionStyle = isOpen ? S_OPEN : S_CLOSE;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: { ...S_ROOT,
      ...style,
      ...TS.ROOT
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      className: CL_CAPTION,
      style: { ...S_CAPTION,
        ...captionStyle,
        ..._captionStyle
      },
      title: _title,
      onClick: onClick,
      children: caption
    }), children, /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.SvgClose, {
      style: S_SVG_CLOSE,
      onClose: onClose
    })]
  });
}

var _default = ItemHeader;
exports.default = _default;
//# sourceMappingURL=ItemHeader.js.map