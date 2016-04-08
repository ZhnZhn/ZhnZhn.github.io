import React from 'react';

import ModalDialog from '../zhn/ModalDialog';
import InputSecret from '../zhn/InputSecret';
import ToolBarButton from '../ToolBarButton';

import ChartStore from '../../flux/stores/ChartStore';

import DialogStyles from '../styles/DialogStyles'

const styles = DialogStyles;

const SettingsDialog = React.createClass({
  _handlerSet(){
    ChartStore.setQuandlKey(this.refs.input.getValue());
    this.props.onClose();
  },

  render(){
    const commandButtons =[
       <ToolBarButton
          key="a"
          type="TypeC"
          caption="Set"
          onClick={this._handlerSet}
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
           <div style={styles.rowDiv} key="1">
              <span style={styles.labelSpan}>
                Quandl:
              </span>
              <InputSecret
                 ref="input"
                 placeholder="Quandl API Key"
              />
           </div>
         </ModalDialog>
    )
  }
});

export default SettingsDialog
