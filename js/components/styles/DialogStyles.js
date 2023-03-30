"use strict";

exports.__esModule = true;
exports.crRowLabelStyle = exports.S_VM_MSG_NUMBER = exports.S_VM_MSG = exports.S_VM_CONT = exports.S_DIALOG_ROW = exports.S_DIALOG_CAPTION = void 0;
var _crStyle = require("../zhn-utils/crStyle");
//Dialogs, DatesFragments
const S_ROW = {
    display: 'flex',
    alignItems: 'center',
    margin: 5
  },
  S_ROW_SHORT = {
    margin: '5px 12px'
  },
  S_LABEL = {
    display: 'inline-block',
    color: '#1b75bb',
    width: 100,
    paddingRight: 6,
    textAlign: 'right',
    fontSize: '16px',
    fontWeight: 'bold',
    userSelect: 'none'
  },
  S_NONE = {
    display: 'none'
  };

//Dialogs, DatesFragments
const S_DIALOG_CAPTION = {
  ...S_LABEL
};
exports.S_DIALOG_CAPTION = S_DIALOG_CAPTION;
const S_DIALOG_ROW = {
  ...S_ROW
};

//[rowStyle, labelStyle]
exports.S_DIALOG_ROW = S_DIALOG_ROW;
const crRowLabelStyle = function (isShowLabels, captionStyle) {
  if (isShowLabels === void 0) {
    isShowLabels = true;
  }
  return [(0, _crStyle.crStyle2)({
    ...S_ROW
  }, isShowLabels && S_ROW_SHORT), (0, _crStyle.crStyle2)({
    ...S_LABEL
  }, isShowLabels ? captionStyle : S_NONE)];
};

//ValidationMessagesFragment
exports.crRowLabelStyle = crRowLabelStyle;
const S_VM_CONT = {
  color: '#f44336',
  paddingLeft: 10,
  paddingTop: 5
};
exports.S_VM_CONT = S_VM_CONT;
const S_VM_MSG_NUMBER = {
  display: 'inline-block',
  width: 22,
  height: 22,
  marginRight: 5,
  textAlign: 'center',
  border: 'solid 2px #f44336',
  borderRadius: '50%'
};
exports.S_VM_MSG_NUMBER = S_VM_MSG_NUMBER;
const S_VM_MSG = {
  //whiteSpace: 'pre',
  fontWeight: 'bold'
};
exports.S_VM_MSG = S_VM_MSG;
//# sourceMappingURL=DialogStyles.js.map