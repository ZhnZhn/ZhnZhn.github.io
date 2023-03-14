"use strict";

exports.__esModule = true;
exports.crStyle3 = exports.crStyle2 = void 0;
const crStyle2 = (style1, style2) => style2 ? {
  ...style1,
  ...style2
} : style1;
exports.crStyle2 = crStyle2;
const crStyle3 = (style1, style2, style3) => crStyle2(crStyle2(style1, style2), style3);
exports.crStyle3 = crStyle3;
//# sourceMappingURL=crStyle.js.map