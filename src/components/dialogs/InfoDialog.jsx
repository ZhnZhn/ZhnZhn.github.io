import React, { Component } from 'react'

import ModalDialog from '../zhn-moleculs/ModalDialog'
import STYLE from '../styles/DialogStyles'

const S = {
  CAPTION : {
    width : '400px',
    paddingLeft : '10px',
    color : 'rgba(164, 135, 212,1)',
    fontSize: '18px',
    fontWeight : 'bold',
    lineHeight : 2
  },
  DESCR : {
    color: 'gray',
    width : '400px',
    paddingLeft : '10px',
    fontWeight: 'bold',
    lineHeight : 1.4,
    whiteSpace : 'pre'
  }
}

class InfoDialog extends Component {

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  }

  render(){
    const { isShow, data, onClose } = this.props
        , { caption, descr } = data;
    return (
      <ModalDialog
        caption="Information"
        isShow={isShow}
        onClose={onClose}
      >
         <div style={STYLE.rowDiv}>
            <p style={S.CAPTION}>
              {caption}
            </p>
         </div>
         <div style={STYLE.rowDiv}>
            <p style={S.DESCR}>{descr}</p>
         </div>
      </ModalDialog>
    );
  }
}

export default InfoDialog
