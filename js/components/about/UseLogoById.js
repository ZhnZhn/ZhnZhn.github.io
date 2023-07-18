"use strict";

exports.__esModule = true;
exports.default = void 0;
var _jsxRuntime = require("react/jsx-runtime");
const PATH_TO_SVG_SPRITE = 'css/sprite.svg';
const UseLogoById = _ref => {
  let {
    id
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("use", {
    href: PATH_TO_SVG_SPRITE + "#" + id + "Logo"
  });
};
var _default = UseLogoById;
exports.default = _default;
//# sourceMappingURL=UseLogoById.js.map