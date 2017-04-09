import React, { Component, PropTypes } from 'react';

import safeFn from '../../utils/safeFn';

import ModalDialog from '../zhn/ModalDialog';
import InputSecret from '../zhn/InputSecret';
import ActionButton from '../zhn/ActionButton';
import RowCheckBox from '../dialogs/RowCheckBox';

import DialogStyles from '../styles/DialogStyles';

const styles = DialogStyles;

const S = {
  MODAL : {
    position : 'static',
    width: '400px',
    height: '150px',
    margin: '70px auto 0px'
  }
}


class SettingsDialog extends Component {
  static propTypes = {
    isShow: PropTypes.bool,
    data: PropTypes.shape({
      setQuandlKey: PropTypes.func,
      isAdminMode: PropTypes.func
    }),
    onClose: PropTypes.func
  }

  constructor(props){
    super()
    this.commandButtons =[
       <ActionButton
          key="a"
          type="TypeC"
          caption="Set"
          onClick={this._handleSet}
       />
    ];
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  }

  _handleSet = () => {
    const { data, onClose } = this.props
        , setQuandlKey = safeFn(data, 'setQuandlKey');
    setQuandlKey(this.inputComp.getValue())
    onClose()
  }
  _handleAdminMode = (mode) => {
    const { data } = this.props
        , isAdminMode = safeFn(data, 'isAdminMode');
    isAdminMode(mode)
  }

  render(){
    const { isShow, data, onClose } = this.props
        , _isAdminMode = safeFn(data, 'isAdminMode', false)();

    return (
         <ModalDialog
            style={S.MODAL}
            caption="User Settings"
            isShow={isShow}
            commandButtons={this.commandButtons}
            onClose={onClose}
         >

           <label style={styles.rowDiv}>
              <span style={styles.labelSpan}>
                Quandl:
              </span>
              <InputSecret
                 ref={ c => this.inputComp = c}
                 placeholder="Quandl API Key"
              />
           </label>

           <RowCheckBox
              initValue={_isAdminMode}
              caption="View in Admin Mode"
              onCheck={this._handleAdminMode.bind(null, true)}
              onUnCheck={this._handleAdminMode.bind(null, false)}
           />
         </ModalDialog>
    )
  }
}

export default SettingsDialog
