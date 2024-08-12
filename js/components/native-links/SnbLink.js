"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Link = _interopRequireDefault(require("./Link"));
var _jsxRuntime = require("react/jsx-runtime");
const SnbLink = _ref => {
  let {
    item
  } = _ref;
  return item ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link.default, {
    caption: "Swiss National Bank",
    href: item
  }) : null;
};
var _default = exports.default = SnbLink;
//# sourceMappingURL=SnbLink.js.map