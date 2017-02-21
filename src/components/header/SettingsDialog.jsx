import React, { Component } from 'react';

import ModalDialog from '../zhn/ModalDialog';
import InputSecret from '../zhn/InputSecret';
import ToolBarButton from '../ToolBarButton';

import ChartStore from '../../flux/stores/ChartStore';

import DialogStyles from '../styles/DialogStyles'

const styles = DialogStyles;

class SettingsDialog extends Component {

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  }

  _handleSet = () => {
    ChartStore.setQuandlKey(this.inputEl.getValue());
    this.props.onClose();
  }

  render(){
    const commandButtons =[
       <ToolBarButton
          key="a"
          type="TypeC"
          caption="Set"
          onClick={this._handleSet}
       />
    ];
    const {isShow, onClose} = this.props;
    return (
         <ModalDialog
            caption="User Settings"
            isShow={isShow}
            commandButtons={commandButtons}
            onClose={onClose}
         >
           <div style={styles.rowDiv}>
              <span style={styles.labelSpan}>
                Quandl:
              </span>
              <InputSecret
                 ref={ c => this.inputEl = c}
                 placeholder="Quandl API Key"
              />
           </div>
         </ModalDialog>
    )
  }
}

export default SettingsDialog
