import React from 'react';

import ModalDialog from '../zhn/ModalDialog';
import DialogStyles from '../styles/DialogStyles'

const styles = DialogStyles;

const Styles = {
  CAPTION : {
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

const AlertDialog = React.createClass({

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  },

  render(){
    const {isShow, data, onClose} = this.props
        , {alertCaption, alertItemId, alertDescr} = data
    return (
      <ModalDialog
        caption="Alert"
        isShow={isShow}
        onClose={onClose}
      >
         <div style={styles.rowDiv} key="1">
            <p style={Styles.CAPTION}>
              {alertCaption + ': '}
              <span style={Styles.ITEM_ID}>{alertItemId}</span>
            </p>
         </div>
         <div style={styles.rowDiv} key="2">
            <p style={Styles.DESCR}>{alertDescr}</p>
         </div>

      </ModalDialog>
    )
  }
});

export default AlertDialog
