"use strict";

exports.__esModule = true;
exports.default = void 0;
var _CL = require("./CL");
var _jsxRuntime = require("react/jsx-runtime");
const ItemOption = _ref => {
  let {
    item,
    propCaption
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: _CL.CL_ITEM_OPTION,
    children: (item || {})[propCaption]
  });
};
var _default = exports.default = ItemOption;
//# sourceMappingURL=ItemOption.js.map