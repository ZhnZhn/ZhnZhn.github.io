import React, { Component } from 'react'

//import PropTypes from 'prop-types'

import safeFn from '../../utils/safeFn'
import RowSecret from '../dialogs/RowSecret'
import FlatButton from '../zhn-m/FlatButton'
import RowButtons from './RowButtons'

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
    super()
    const { data } = props;

    let i = 1;
    for(; i<7; i++){
      this['_setKey'+i] = safeFn(data, 'key'+i)
    }
  }

  _hSetAll = () => {
    const { onClose } = this.props;

    this._setKey1(this.iComp1.getValue())
    this._setKey2(this.iComp2.getValue())
    this._setKey3(this.iComp3.getValue())
    this._setKey4(this.iComp4.getValue())
    this._setKey5(this.iComp5.getValue())
    this._setKey6(this.iComp6.getValue())

    onClose()
  }

  _hClearAll = () => {
    this._setKey1('')
    this._setKey2('')
    this._setKey3('')
    this._setKey4('')
    this._setKey5('')
    this._setKey6('')

    this.iComp1.clear()
    this.iComp2.clear()
    this.iComp3.clear()
    this.iComp4.clear()
    this.iComp5.clear()
    this.iComp6.clear()
  }

  _ref1 = n => this.iComp1 = n
  _ref2 = n => this.iComp2 = n
  _ref3 = n => this.iComp3 = n
  _ref4 = n => this.iComp4 = n
  _ref5 = n => this.iComp5 = n
  _ref6 = n => this.iComp6 = n

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
           title="Intrinio:"
           placeholder="Intrinio API Key"
           maxLength="32"
           onEnter={this._setKey4}
        />
        <RowSecret
           ref={this._ref5}
           titleStyle={titleStyle}
           title="Quandl:"
           placeholder="Quandl API Key"
           onEnter={this._setKey5}
        />
        <RowSecret
           ref={this._ref6}
           titleStyle={titleStyle}
           title="EIA:"
           placeholder="EIA API Key"
           maxLength="32"
           onEnter={this._setKey6}
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
