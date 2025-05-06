"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Link = _interopRequireDefault(require("../zhn/Link"));
var _jsxRuntime = require("react/jsx-runtime");
const DfLink = props => {
  const {
    caption,
    ...restProps
  } = props.item;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link.default, {
    ...restProps,
    children: caption
  });
};
var _default = exports.default = DfLink;
//# sourceMappingURL=DfLink.js.map