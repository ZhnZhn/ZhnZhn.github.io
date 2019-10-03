import React, { Component } from 'react'

//import PropTypes from 'prop-types'

import safeFn from '../../utils/safeFn'
import RowSecret from '../dialogs/RowSecret'
import FlatButton from '../zhn-m/FlatButton'
import RowButtons from './RowButtons'

const MAX_KEY = 8;

class PaneApiKey extends Component {
  /*
  static propTypes = {
    titleStyle: PropTypes.object,
    btStyle: PropTypes.object,
    data: PropTypes.object,
    onClose: PropTypes.func
  }
  */

  constructor(props){
    super(props)
    const { data } = props;

    let i = 1;
    for(; i<MAX_KEY; i++){
      this['_setKey'+i] = safeFn(data, 'key'+i)
    }
  }

  _hSetAll = () => {
    const { onClose } = this.props;

    let i = 1;
    for(; i<MAX_KEY; i++) {
      this['_setKey'+i](this['iComp'+i].getValue())
    }

    onClose()
  }

  _hClearAll = () => {
    let i = 1;
    for(i; i<MAX_KEY; i++) {
      this['_setKey'+i]('')
      this['iComp'+i].clear()
    }
  }

  _ref1 = n => this.iComp1 = n
  _ref2 = n => this.iComp2 = n
  _ref3 = n => this.iComp3 = n
  _ref4 = n => this.iComp4 = n
  _ref5 = n => this.iComp5 = n
  _ref6 = n => this.iComp6 = n
  _ref7 = n => this.iComp7 = n

  render(){
    const { titleStyle, btStyle, onClose } = this.props;
    return (
      <div>        
        <RowSecret
           ref={ this._ref1}
           titleStyle={titleStyle}
           title="Alpha:"
           placeholder="Alpha Vantage API Key"
           onEnter={this._setKey1}
        />
        <RowSecret
           ref={this._ref2}
           titleStyle={titleStyle}
           title="Barchar:"
           placeholder="Barchar API Key"
           onEnter={this._setKey2}
        />
        <RowSecret
           ref={this._ref3}
           titleStyle={titleStyle}
           title="BEA:"
           placeholder="BEA API Key"
           maxLength="36"
           onEnter={this._setKey3}
        />
        <RowSecret
           ref={this._ref4}
           titleStyle={titleStyle}
           title="EIA:"
           placeholder="EIA API Key"
           maxLength="32"
           onEnter={this._setKey4}
        />
        <RowSecret
           ref={this._ref5}
           titleStyle={titleStyle}
           title="Intrinio:"
           placeholder="Intrinio API Key"
           maxLength="32"
           onEnter={this._setKey5}
        />
        <RowSecret
           ref={this._ref6}
           titleStyle={titleStyle}
           title="Quandl:"
           placeholder="Quandl API Key"
           onEnter={this._setKey6}
        />
        <RowSecret
           ref={this._ref7}
           titleStyle={titleStyle}
           title="WTD:"
           placeholder="World Trading Data API Key"
           maxLength="60"
           onEnter={this._setKey7}
        />
        <RowButtons btStyle={btStyle} onClose={onClose}>
          <FlatButton
            caption="SET ALL & CLOSE"
            isPrimary={true}
            onClick={this._hSetAll}
          />
          <FlatButton
            rootStyle={btStyle}
            caption="CLEAR ALL"
            onClick={this._hClearAll}
          />
        </RowButtons>
      </div>
    );
  }
}

export default PaneApiKey
