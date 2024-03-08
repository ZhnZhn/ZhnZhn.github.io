"use strict";

exports.__esModule = true;
exports.crRowLabelStyle = exports.S_VM_MSG_NUMBER = exports.S_VM_MSG = exports.S_VM_CONT = exports.S_DIALOG_ROW = void 0;
var _styleFn = require("../styleFn");
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
    ..._styleFn.S_INLINE,
    width: 100,
    paddingRight: 6,
    textAlign: 'right'
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
  }, isShowLabels && S_ROW_SHORT), (0, _styleFn.crStyle2)({
    ...S_LABEL
  }, isShowLabels ? captionStyle : _styleFn.S_NONE)];
};

//ValidationMessagesFragment
exports.crRowLabelStyle = crRowLabelStyle;
const S_VM_CONT = exports.S_VM_CONT = {
  color: '#f44336',
  paddingLeft: 10,
  paddingTop: 5
};
const S_VM_MSG_NUMBER = exports.S_VM_MSG_NUMBER = {
  ..._styleFn.S_INLINE,
  width: 22,
  height: 22,
  marginRight: 5,
  textAlign: 'center',
  border: 'solid 2px #f44336',
  borderRadius: '50%'
};
const S_VM_MSG = exports.S_VM_MSG = {
  //whiteSpace: 'pre',
  fontWeight: 'bold'
};
//# sourceMappingURL=DialogStyles.js.map