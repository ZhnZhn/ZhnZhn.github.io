
const S = {
  //Dialogs, DatesFragments
  ROW: {
    //display: 'block',
    display: 'flex',
    alignItems: 'center',
    marginRight: 5,
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 5
  },
  ROW_OC: {
    lineHeight: 'unset',
    marginRight: 5,
    marginTop: 5,
    marginLeft: 5,
    marginBottom: -4
  },
  ROW_SHORT: {
    marginLeft: 12,
    marginRight: 12
  },
  LABEL: {
    color: '#1b75bb',
    display: 'inline-block',
    //verticalAlign: 'top',
    textAlign: 'right',
    width: 100,
    paddingRight: 5,
    fontSize: '16px',
    fontWeight: 'bold',
    userSelect: 'none'
  },
  NONE: {
    display: 'none'
  }
}

const DialogStyles = {
  //Dialogs, DatesFragments
  rowDiv: { ...S.ROW },
  labelSpan : { ...S.LABEL },

  crRowCaption: (caption) => caption.indexOf(':') === -1
    && caption !== ''
      ? `${caption}:`
      : caption,
  crRowLabelStyle: (isShowLabels=true, captionStyle) => {
    const rowStyle = isShowLabels
             ? { ...S.ROW }
             : { ...S.ROW, ...S.ROW_SHORT }
         , labelStyle = isShowLabels
             ? { ...S.LABEL, ...captionStyle }
             : { ...S.LABEL, ...S.NONE };
    return { rowStyle, labelStyle };
  },

  crRowOcSelectStyle: (isShowLabels=true, captionStyle) => {
    const rowStyle = isShowLabels
             ? { ...S.ROW_OC }
             : { ...S.ROW_OC, ...S.ROW_SHORT }
         , labelStyle = isShowLabels
             ? { ...S.LABEL, ...captionStyle }
             : { ...S.LABEL, ...S.NONE };
    return { rowStyle, labelStyle };
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
    whiteSpace: 'pre',
    fontWeight: 'bold'
  }

}

export default DialogStyles;
