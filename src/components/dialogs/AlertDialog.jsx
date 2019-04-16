import React, { Component } from 'react';
//import PropTypes from "prop-types";

import ModalDialog from '../zhn-moleculs/ModalDialog';
import STYLE from '../styles/DialogStyles'

const CL = {
  ELL: 'ellipsis'
};

const S = {
  CAPTION : {
    display : 'inline-block',
    width : '400px',
    paddingLeft : '10px',
    color : '#F44336',
    fontSize: '18px',
    fontWeight : 'bold',
    lineHeight : 2
  },
  ITEM_ID : {
    width: '120px',
    color: '#a487d4',
    fontWeight : 'bold',
    verticalAlign: 'bottom'
  },
  DESCR: {
    color: 'gray',
    width: '400px',
    paddingLeft: '10px',
    paddingRight: '8px',
    fontWeight: 'bold',
    lineHeight: 1.4,
    whiteSpace: 'pre-line',
    wordWrap: 'break-word'
  }
}

class AlertDialog extends Component{
  /*
  static propTypes = {
    isShow: PropTypes.bool,
    data: PropTypes.shape({
      alertCaption: PropTypes.string,
      alertItemId: PropTypes.string,
      alertDescr: PropTypes.string
    }),
    onClose: PropTypes.func
  }  
  */

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  }

  render(){
    const { isShow, data, onClose } = this.props
    , { alertCaption='Item', alertItemId='', alertDescr } = data
    , _caption = alertCaption + ': ';
    return (
      <ModalDialog
        caption="Alert"
        isShow={isShow}
        onClose={onClose}
      >
         <div style={STYLE.rowDiv}>
            <span style={S.CAPTION}>
              {_caption}
              <span
                className={CL.ELL}
                style={S.ITEM_ID}
                title={alertItemId}
              >
                {alertItemId}
              </span>
            </span>
         </div>
         <div style={STYLE.rowDiv}>
            <p style={S.DESCR}>
              {alertDescr}
            </p>
         </div>
      </ModalDialog>
    );
  }
}

export default AlertDialog
