"use strict";

exports.__esModule = true;
exports.default = void 0;
//Dialogs, DatesFragments
const S_ROW = {
  display: 'flex',
  alignItems: 'center',
  margin: 5
},
      S_ROW_SHORT = {
  margin: '5px 12px'
},
      S_ROW_OC = {
  display: 'flex',
  alignItems: 'center',
  margin: 5
},
      S_ROW_OC_SHORT = {
  margin: '5px 12px'
},
      S_LABEL = {
  color: '#1b75bb',
  display: 'inline-block',
  //verticalAlign: 'top',
  textAlign: 'right',
  width: 100,
  paddingRight: 6,
  fontSize: '16px',
  fontWeight: 'bold',
  userSelect: 'none'
},
      S_NONE = {
  display: 'none'
};
const DialogStyles = {
  //Dialogs, DatesFragments
  ROW: { ...S_ROW
  },
  CAPTION: { ...S_LABEL
  },
  crRowLabelStyle: (isShowLabels = true, captionStyle) => {
    const rowStyle = isShowLabels ? { ...S_ROW
    } : { ...S_ROW,
      ...S_ROW_SHORT
    },
          labelStyle = isShowLabels ? { ...S_LABEL,
      ...captionStyle
    } : { ...S_LABEL,
      ...S_NONE
    };
    return {
      rowStyle,
      labelStyle
    };
  },
  crRowOcSelectStyle: (isShowLabels = true, captionStyle) => {
    const rowStyle = isShowLabels ? { ...S_ROW_OC
    } : { ...S_ROW_OC,
      ...S_ROW_OC_SHORT
    },
          labelStyle = isShowLabels ? { ...S_LABEL,
      ...captionStyle
    } : { ...S_LABEL,
      ...S_NONE
    };
    return {
      rowStyle,
      labelStyle
    };
  },
  //ValidationMessagesFragment
  VM_CONT: {
    paddingLeft: 10,
    paddingTop: 5,
    color: '#f44336'
  },
  VM_MSG_NUMBER: {
    display: 'inline-block',
    width: 22,
    height: 22,
    border: 'solid 2px #F44336',
    borderRadius: '50%',
    textAlign: 'center',
    marginRight: 5
  },
  VM_MSG: {
    //whiteSpace: 'pre',
    fontWeight: 'bold'
  }
};
var _default = DialogStyles;
exports.default = _default;
//# sourceMappingURL=DialogStyles.js.map