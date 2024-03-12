"use strict";

exports.__esModule = true;
exports.crRowLabelStyle = exports.S_DIALOG_ROW = void 0;
var _styleFn = require("../styleFn");
//Dialogs, DatesFragments
const S_ROW = {
    display: 'flex',
    alignItems: 'center',
    margin: 5
  },
  S_ROW_SHORT = {
    margin: '5px 12px'
  };

//Dialogs, DatesFragments
const S_DIALOG_ROW = exports.S_DIALOG_ROW = {
  ...S_ROW
};

//[rowStyle, labelStyle]
const crRowLabelStyle = function (isShowLabels, captionStyle) {
  if (isShowLabels === void 0) {
    isShowLabels = true;
  }
  return [(0, _styleFn.crStyle2)({
    ...S_ROW
  }, isShowLabels && S_ROW_SHORT), (0, _styleFn.crStyle2)(void 0, isShowLabels ? captionStyle : _styleFn.S_NONE)];
};
exports.crRowLabelStyle = crRowLabelStyle;
//# sourceMappingURL=DialogStyles.js.map