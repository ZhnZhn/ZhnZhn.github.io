"use strict";

exports.__esModule = true;
exports.crStyle2 = exports.crStyle = void 0;
const _assign = Object.assign;
const crStyle2 = (style1, style2) => style2 ? {
  ...style1,
  ...style2
} : style1;
exports.crStyle2 = crStyle2;
const crStyle = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return args.reduce((style, itemStyle) => itemStyle ? _assign(style, itemStyle) : style, {});
};
exports.crStyle = crStyle;
//# sourceMappingURL=crStyle.js.map