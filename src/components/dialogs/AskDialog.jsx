import React, { Component, PropTypes } from 'react';

import Button from './Button'
import ModalDialog from '../zhn-moleculs/ModalDialog';
import MathCaptcha from '../zhn-moleculs/MathCaptcha';
import STYLE from '../styles/DialogStyles';

import BrowserActions from '../../flux/actions/BrowserActions';
import ChartActions from '../../flux/actions/ChartActions';

const MSG_PREFIX = "Would you like load item";
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

   static propTypes = {
     isShow: PropTypes.bool,
     data: PropTypes.shape({
       options: PropTypes.shape({
         chartType: PropTypes.string,
         browserType: PropTypes.string
       })
     }),
     onClose: PropTypes.func
   }

  constructor(props){
    super();

    this._handleLoad = this._handleLoad.bind(this)
    this._commandButtons = [
        <Button.Flat
          caption="Yes, Load"
          //accessKey="s"
          isPrimary={true}
          onClick={this._handleLoad}
        />,
        <Button.Flat
          caption="No, Close"
          //accessKey="c"
          onClick={props.onClose}
        />
    ]
  }

  _handleLoad(){
    const { data={}, onClose } = this.props
        , { options={} } = data;

    if (this.captchaComp.isOk()){
      BrowserActions.showBrowser(options.browserType)
      ChartActions.loadStock(
        options.chartType,
        options.browserType,
        options
      )
      onClose()
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
        commandButtons={this._commandButtons}
        withoutClose={true}
        onClose={onClose}
      >
         <div style={STYLE.rowDiv}>
            <p style={S.DESCR}>
               {MSG_PREFIX}
               <span style={S.NAME}>{name}</span>
               {MSG_SUFFIX}
            </p>
            <MathCaptcha
              ref={c => this.captchaComp = c}
              rootStyle={S.CAPTCHA}
            />
         </div>
      </ModalDialog>
    )
  }
}

export default AskDialog
