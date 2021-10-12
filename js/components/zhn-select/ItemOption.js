"use strict";

exports.__esModule = true;
exports.default = void 0;

var _jsxRuntime = require("react/jsx-runtime");

const S_CAPTION = {
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

const ItemOption = ({
  item = {},
  propCaption
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
  style: S_CAPTION,
  children: item[propCaption]
});

var _default = ItemOption;
exports.default = _default;
//# sourceMappingURL=ItemOption.js.map