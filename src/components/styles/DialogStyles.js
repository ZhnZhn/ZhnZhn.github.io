
const S = {
  //Dialogs, DatesFragments
  ROW: {
    //display: 'block',
    display: 'flex',
    alignItems: 'center',
    marginRight: '5px',
    marginTop: '5px',
    marginLeft: '5px',
    marginBottom: '5px'
  },
  ROW_OC: {
    lineHeight: 'unset',
    marginRight: '5px',
    marginTop: '5px',
    marginLeft: '5px',
    marginBottom: '-4px'
  },
  ROW_SHORT: {
    marginLeft: '12px',
    marginRight: '12px'
  },
  LABEL: {
    color: '#1B75BB',
    display: 'inline-block',
    //verticalAlign: 'top',
    textAlign: 'right',
    width: '100px',
    paddingRight: '5px',
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

  crRowLabelStyle: (isShowLabels=true) => {
    const rowStyle = isShowLabels
             ? { ...S.ROW }
             : { ...S.ROW, ...S.ROW_SHORT }
         , labelStyle = isShowLabels
             ? { ...S.LABEL }
             : { ...S.LABEL, ...S.NONE };
    return { rowStyle, labelStyle };
  },

  crRowOcSelectStyle: (isShowLabels=true) => {
    const rowStyle = isShowLabels
             ? { ...S.ROW_OC }
             : { ...S.ROW_OC, ...S.ROW_SHORT }
         , labelStyle = isShowLabels
             ? { ...S.LABEL }
             : { ...S.LABEL, ...S.NONE };
    return { rowStyle, labelStyle };
  },

  //ValidationMessagesFragment
  validationContainer: {
    paddingLeft: '10px',
    paddingTop: '5px',
    color: '#F44336'
  },
  validationMessageNumber : {
    display: 'inline-block',
    width: '22px',
    height: '22px',
    border: 'solid 2px #F44336',
    borderRadius: '50%',
    textAlign: 'center',
    marginRight: '5px'
  }

}

export default DialogStyles;
