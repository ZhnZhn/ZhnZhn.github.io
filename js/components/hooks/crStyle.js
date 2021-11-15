"use strict";

exports.__esModule = true;
exports.default = void 0;
const _assign = Object.assign;

const crStyle = arr => (arr || []).reduce((style, itemStyle) => {
  if (itemStyle) {
    _assign(style, itemStyle);
  }

  return style;
}, {});

var _default = crStyle;
exports.default = _default;
//# sourceMappingURL=crStyle.js.map