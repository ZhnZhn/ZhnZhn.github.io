import React, { Component } from 'react';

import ActionButton from '../zhn/ActionButton';
import ModalDialog from '../zhn/ModalDialog';
import MathCaptcha from '../zhn-moleculs/MathCaptcha';
//import InputSlider from '../zhn/InputSlider';
import DialogStyles from '../styles/DialogStyles'

import BrowserActions from '../../flux/actions/BrowserActions';
import ChartActions from '../../flux/actions/ChartActions';

const styles = DialogStyles;

const MSG_PREFIX = "Would you like load item"
const MSG_SUFFIX = "from url?";

const S = {
  MODAL : {
    position: 'static',
    width: '400px',
    height: '205px',
    margin: '70px auto'
  },
  NAME : {
    color: '#a487d4',
    paddingLeft: '5px',
    paddingRight: '5px'
  },
  DESCR : {
    color: 'gray',
    width : '400px',
    paddingLeft : '10px',
    paddingTop: '5px',
    fontWeight: 'bold',
    lineHeight : 1.4,
    whiteSpace : 'pre'
  },
  CAPTCHA : {
    padding: '8px',
    paddingBottom : '0px'
  }
}

class AskDialog extends Component {

  constructor(props){
    super();

    this._handleLoad = this._handleLoad.bind(this)
    this.commandButtons = [
        <ActionButton
          type="TypeC"
          caption="Yes, Load"
          onClick={this._handleLoad}
        />,
        <ActionButton
          type="TypeC"
          caption="No, Close"
          onClick={props.onClose}
        />
    ]
  }

  _handleLoad(){
    const { data={}, onClose } = this.props
        , { options={} } = data

    if (this.captchaComp.isOk()){
      BrowserActions.showBrowser(options.browserType)
      ChartActions.loadStock(
        options.chartType,
        options.browserType,
        options
      )
      onClose();
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  }

  render(){
    const { isShow, data={}, onClose } = this.props
        , { options={} } = data
        , { name='' } = options;

    return (
      <ModalDialog
        style={S.MODAL}
        caption="Confirm Load"
        isShow={isShow}
        commandButtons={this.commandButtons}
        withoutClose={true}
        onClose={onClose}
      >
         <div style={styles.rowDiv}>
            <p style={S.DESCR}>
               {MSG_PREFIX}
               <span style={S.NAME}>{name}</span>
               {MSG_SUFFIX}
            </p>
            <MathCaptcha
              ref={c => this.captchaComp = c}
              rootStyle={S.CAPTCHA}
            />
            {/*
            <p>For load, please answer, what is</p>
            <InputSlider />
            */}
         </div>
      </ModalDialog>
    )
  }
}

AskDialog.displayName = 'AskDialog';

export default AskDialog
