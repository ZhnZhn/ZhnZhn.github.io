import React, { Component } from 'react';

import ModalDialog from '../zhn/ModalDialog';
import DialogStyles from '../styles/DialogStyles'

const styles = DialogStyles;

const Styles = {
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
    color: 'rgba(164, 135, 212,1)',
    fontWeight : 'bold'
  },
  DESCR : {
    color: 'gray',
    width : '400px',
    paddingLeft : '10px',
    fontWeight: 'bold',
    lineHeight : 1.4,
    whiteSpace: 'pre-line'
  }
}

const ELLIPSIS = '...';

class AlertDialog extends Component{

   constructor(props){
     super();
   }

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  }

  render(){
    const {isShow, data, onClose} = this.props
        , {alertCaption, alertItemId='', alertDescr} = data
        , _alertItemId = alertItemId.substring(0,20) + ELLIPSIS
    return (
      <ModalDialog
        caption="Alert"
        isShow={isShow}
        onClose={onClose}
      >
         <div style={styles.rowDiv} key="1">
            <span style={Styles.CAPTION}>
              {alertCaption + ': '}
              <span style={Styles.ITEM_ID} title={alertItemId}>
                {_alertItemId}
              </span>
            </span>
         </div>
         <div style={styles.rowDiv} key="2">
            <p style={Styles.DESCR}>{alertDescr}</p>
         </div>

      </ModalDialog>
    )
  }
}

AlertDialog.displayName = 'AlertDialog';

export default AlertDialog
