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
    height: '390px',
    margin: '70px auto 0px'
  },
  TITLE: {
    width: '110px'
  }
};

const SET = {
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

    let i = 1;
    for(; i<6; i++){
      this['_setKey'+i] = safeFn(data, 'key'+i)
    }
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

    this._setKey1(this.iComp1.getValue())
    this._setKey2(this.iComp2.getValue())
    this._setKey3(this.iComp3.getValue())
    this._setKey4(this.iComp4.getValue())
    this._setKey5(this.iComp5.getValue())
    this._setProxy(this.proxyComp.getValue())

    onClose()
  }
  _handleMode = (fnName, mode) => {
    const { data } = this.props
        , fnMode = safeFn(data, fnName);
    fnMode(mode)
  }

  _ref1 = n => this.iComp1 = n
  _ref2 = n => this.iComp2 = n
  _ref3 = n => this.iComp3 = n
  _ref4 = n => this.iComp4 = n
  _ref5 = n => this.iComp5 = n
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
               ref={ this._ref1}
               titleStyle={S.TITLE}
               title="Alpha:"
               placeholder="Alpha Vantage API Key"
               onEnter={this._setKey1}
            />
            <RowSecret
               ref={this._ref2}
               titleStyle={S.TITLE}
               title="Barchar:"
               placeholder="Barchar API Key"
               onEnter={this._setKey2}
            />
            <RowSecret
               ref={this._ref3}
               titleStyle={S.TITLE}
               title="BEA:"
               placeholder="BEA API Key"
               maxLength="36"
               onEnter={this._setKey3}
            />
            <RowSecret
               ref={this._ref4}
               titleStyle={S.TITLE}
               title="Intrinio:"
               placeholder="Intrinio API Key"
               maxLength="32"
               onEnter={this._setKey4}
            />
            <RowSecret
               ref={this._ref5}
               titleStyle={S.TITLE}
               title="Quandl:"
               placeholder="Quandl API Key"
               onEnter={this._setKey5}
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
