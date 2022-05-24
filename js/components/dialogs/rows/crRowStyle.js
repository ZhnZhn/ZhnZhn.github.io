"use strict";

exports.__esModule = true;
exports.default = void 0;

var _DialogStyles = require("../../styles/DialogStyles");

//rowStyle, labelStyle
const crRowStyle = (_ref, isOc) => {
  let {
    isShowLabels,
    captionStyle
  } = _ref;
  return isOc ? (0, _DialogStyles.crRowOcSelectStyle)(isShowLabels, captionStyle) : (0, _DialogStyles.crRowLabelStyle)(isShowLabels, captionStyle);
};

var _default = crRowStyle;
exports.default = _default;
//# sourceMappingURL=crRowStyle.js.map