"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Link = _interopRequireDefault(require("./Link"));
var _jsxRuntime = require("react/jsx-runtime");
const DATA_URL = 'https://www.fao.org/faostat/en/#data/';
const _isStr = v => typeof str === 'string';
const FaoStatLink = _ref => {
  let {
    item
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link.default, {
    isHttp: true,
    href: _isStr(item) ? DATA_URL + item : DATA_URL,
    caption: "FAOSTAT Link"
  });
};
var _default = FaoStatLink;
exports.default = _default;
//# sourceMappingURL=FaoStatLink.js.map