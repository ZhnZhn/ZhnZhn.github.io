import React from 'react';

import ModalDialog from '../zhn/ModalDialog';
import DialogStyles from '../styles/DialogStyles'

const styles = DialogStyles;

const Styles = {
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

const InfoDialog = React.createClass({

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  },

  render(){
    const {isShow, data, onClose} = this.props
        , {caption, descr} = data
    return (
      <ModalDialog
        caption="Information"
        isShow={isShow}
        onClose={onClose}
      >
         <div style={styles.rowDiv} key="1">
            <p style={Styles.CAPTION}>
              {caption}
            </p>
         </div>
         <div style={styles.rowDiv} key="2">
            <p style={Styles.DESCR}>{descr}</p>
         </div>

      </ModalDialog>
    )
  }
});

export default InfoDialog
