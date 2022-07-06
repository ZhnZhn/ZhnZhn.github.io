"use strict";

exports.__esModule = true;
exports.default = void 0;

var _GeneralStyles = require("../styles/GeneralStyles");

var _jsxRuntime = require("react/jsx-runtime");

const S_CAPTION = {
  width: '100%',
  ..._GeneralStyles.S_ELLIPSIS
};

const ItemOption = _ref => {
  let {
    item,
    propCaption
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: S_CAPTION,
    children: (item || {})[propCaption]
  });
};

var _default = ItemOption;
exports.default = _default;
//# sourceMappingURL=ItemOption.js.map