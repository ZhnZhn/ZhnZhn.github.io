"use strict";

exports.__esModule = true;
exports.BtCaption = void 0;
var _jsxRuntime = require("react/jsx-runtime");
const S_HOT_KEY = {
  textDecoration: 'underline'
};
const _crCaption = (hotKey, caption) => {
  const _hotKeyIndex = hotKey ? caption.toUpperCase().indexOf(hotKey) : -1;
  if (_hotKeyIndex === -1) {
    return caption;
  }
  const _beforeToken = caption.slice(0, _hotKeyIndex),
    _hotKey = caption.slice(_hotKeyIndex, _hotKeyIndex + 1),
    _afterToken = caption.slice(_hotKeyIndex + 1);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      children: _beforeToken
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: S_HOT_KEY,
      children: _hotKey
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      children: _afterToken
    })]
  });
};
const BtCaption = _ref => {
  let {
    className,
    caption,
    hotKey,
    children
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
    className: className,
    children: [_crCaption(hotKey, caption), children]
  });
};
exports.BtCaption = BtCaption;
//# sourceMappingURL=BtCaption.js.map