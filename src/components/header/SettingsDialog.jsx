import React, { Component } from 'react'
//import PropTypes from 'prop-types'

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
    height: '360px',
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
  BEA_KEY: 'setBeaKey',
  PROXY: 'setProxy'
};

const MODE_ADMIN = 'isAdminMode';
const MODE_DELTA = 'isDrawDeltaExtrems';
const MODE_ZOOM = 'isNotZoomToMinMax';

class SettingsDialog extends Component {
  /*
  static propTypes = {
    isShow: PropTypes.bool,
    data: PropTypes.shape({
      setQuandlKey: PropTypes.func,
      isAdminMode: PropTypes.func,
      isDrawDeltaExtrems: PropTypes.func
    }),
    onClose: PropTypes.func
  }
  */

  constructor(props){
    super()
    const { data } = props;

    this._setQuandlKey = safeFn(data, SET.QUANDL_KEY)
    this._setAlphaKey = safeFn(data, SET.ALPHA_KEY)
    this._setBarcharKey = safeFn(data, SET.BARCHAR_KEY)
    this._setBeaKey = safeFn(data, SET.BEA_KEY)
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
    this._setAlphaKey(this.alphaComp.getValue())
    this._setBarcharKey(this.barcharComp.getValue())
    this._setBeaKey(this.beaComp.getValue())
    this._setProxy(this.proxyComp.getValue())

    onClose()
  }
  _handleMode = (fnName, mode) => {
    const { data } = this.props
        , fnMode = safeFn(data, fnName);
    fnMode(mode)
  }

  _refBarchart = n => this.barcharComp = n
  _refAlpha = n => this.alphaComp = n
  _refQuandl = n => this.inputComp = n
  _refBea = n => this.beaComp = n
  _refProxy = n => this.proxyComp = n

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
               ref={ this._refAlpha}
               titleStyle={S.TITLE}
               title="Alpha:"
               placeholder="Alpha Vantage API Key"
               onEnter={this._setAlphaKey}
            />
            <RowSecret
               ref={this._refBarchart}
               titleStyle={S.TITLE}
               title="Barchar:"
               placeholder="Barchar API Key"
               onEnter={this._setBarcharKey}
            />
            <RowSecret
               ref={this._refBea}
               titleStyle={S.TITLE}
               title="BEA:"
               placeholder="BEA API Key"
               maxLength="36"
               onEnter={this._setBeaKey}
            />
            <RowSecret
               ref={this._refQuandl}
               titleStyle={S.TITLE}
               title="Quandl:"
               placeholder="Quandl API Key"
               onEnter={this._setQuandlKey}
            />
            <RowPattern
               ref={this._refProxy}
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
