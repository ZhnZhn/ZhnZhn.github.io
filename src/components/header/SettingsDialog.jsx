import React, { Component, PropTypes } from 'react'

import safeFn from '../../utils/safeFn'

import ModalDialog from '../zhn-moleculs/ModalDialog'
import RowSecret from '../dialogs/RowSecret'
import RowPattern from '../dialogs/RowPattern'
import FlatButton from '../zhn-m/FlatButton'
import RowCheckBox from '../dialogs/RowCheckBox'

const S = {
  MODAL : {
    position : 'static',
    width: '380px',
    height: '320px',
    margin: '70px auto 0px'
  },
  TITLE: {
    width: '110px'
  }
};

const SET = {
  QUANDL_KEY: 'setQuandlKey',
  ALPHA_KEY: 'setAlphaKey',
  BARCHAR_KEY: 'setBarcharKey',
  PROXY: 'setProxy'
};

const MODE_ADMIN = 'isAdminMode';
const MODE_DELTA = 'isDrawDeltaExtrems';
const MODE_ZOOM = 'isNotZoomToMinMax';

class SettingsDialog extends Component {
  static propTypes = {
    isShow: PropTypes.bool,
    data: PropTypes.shape({
      setQuandlKey: PropTypes.func,
      isAdminMode: PropTypes.func,
      isDrawDeltaExtrems: PropTypes.func
    }),
    onClose: PropTypes.func
  }

  constructor(props){
    super()
    const { data } = props;

    this._setQuandlKey = safeFn(data, SET.QUANDL_KEY)
    this._setAlpheKey = safeFn(data, SET.ALPHA_KEY)
    this._setBarcharKey = safeFn(data, SET.BARCHAR_KEY)
    this._setProxy = safeFn(data, SET.PROXY)

    this._commandButtons = [
      <FlatButton
        caption="Set All & Close"
        isPrimary={true}
        onClick={this._handleSet}
      />
    ]
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  }

  _handleSet = () => {
    const { onClose } = this.props;

    this._setQuandlKey(this.inputComp.getValue())
    this._setAlpheKey(this.alphaComp.getValue())
    this._setBarcharKey(this.barcharComp.getValue())
    this._setProxy(this.proxyComp.getValue())

    onClose()
  }
  _handleMode = (fnName, mode) => {
    const { data } = this.props
        , fnMode = safeFn(data, fnName);
    fnMode(mode)
  }

  render(){
    const { isShow, data, onClose } = this.props
        , _proxy = data.getProxy()
        , _isAdminMode = safeFn(data, MODE_ADMIN, false)()
        , _isDrawDeltaExtrems = safeFn(data, MODE_DELTA, false)()
        , _isNotZoomToMinMax = safeFn(data, MODE_ZOOM, false)();

    return (
         <ModalDialog
            style={S.MODAL}
            caption="User Settings"
            isShow={isShow}
            commandButtons={this._commandButtons}
            onClose={onClose}
         >
            <RowSecret
               ref={ c => this.alphaComp = c}
               titleStyle={S.TITLE}
               title="Alpha:"
               placeholder="Alpha API Key"
               onEnter={this._setAlpheKey}
            />
            <RowSecret
               ref={ c => this.barcharComp = c}
               titleStyle={S.TITLE}
               title="Barchar:"
               placeholder="Barchar API Key"
               onEnter={this._setBarcharKey}
            />
            <RowSecret
               ref={ c => this.inputComp = c}
               titleStyle={S.TITLE}
               title="Quandl:"
               placeholder="Quandl API Key"
               onEnter={this._setQuandlKey}
            />
            <RowPattern
               ref={ c => this.proxyComp = c}
               titleStyle={S.TITLE}
               title="Https Proxy:"
               placeholder="Https Proxy for CORS"
               initValue={_proxy}
               onEnter={this._setProxy}
            />

           <RowCheckBox
              initValue={_isAdminMode}
              caption="View in Admin Mode"
              onCheck={this._handleMode.bind(null, MODE_ADMIN, true)}
              onUnCheck={this._handleMode.bind(null, MODE_ADMIN, false)}
           />
           <RowCheckBox
              initValue={_isDrawDeltaExtrems}
              caption="Draw Delta Extrems"
              onCheck={this._handleMode.bind(null, MODE_DELTA, true)}
              onUnCheck={this._handleMode.bind(null, MODE_DELTA, false)}
           />
           <RowCheckBox
              initValue={_isNotZoomToMinMax}
              caption="Not Zoom to Min-Max"
              onCheck={this._handleMode.bind(null, MODE_ZOOM, true)}
              onUnCheck={this._handleMode.bind(null, MODE_ZOOM, false)}
           />
         </ModalDialog>
    );
  }
}

export default SettingsDialog
