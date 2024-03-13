"use strict";

exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../../styleFn");
const crRowLabelStyle = _ref => {
  let {
    isShowLabels,
    captionStyle
  } = _ref;
  return isShowLabels ? captionStyle : _styleFn.S_NONE;
};
var _default = exports.default = crRowLabelStyle;
//# sourceMappingURL=crRowLabelStyle.js.map