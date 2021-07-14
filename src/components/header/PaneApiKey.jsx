import { Component } from 'react'

//import PropTypes from 'prop-types'

import safeFn from '../../utils/safeFn'
import RowSecret from '../dialogs/RowSecret'
import FlatButton from '../zhn-m/FlatButton'
import RowButtons from './RowButtons'

const MAX_KEY = 10;

const S = {
  BT_SET: {
    marginLeft: 8,
    marginRight: 8
  }
};

const CONF_ARR = [
  ["Alpha", "alpha-vantage", "Alpha Vantage"],
  ["Twelve", "twelve", "Twelve Data"],
  ["BEA","bea","BEA","36"],
  ["BLS","bls","BLS","32"],
  ["EIA","eia","EIA","32"],
  ["FMP","fmp","Financial Modeling Prep","32"],
  ["IEX","iex-cloud","IEX Cloud","35"],
  ["Intrinio","intrinio","Intrinio","32"],
  ["Quandl","quandl","Quandl"]
];

class PaneApiKey extends Component {
  /*
  static propTypes = {
    isShow: PropTypes.bool,
    isSelected: PropTypes.bool,
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
    let i = 1;
    for(; i<MAX_KEY; i++) {
      this['_setKey'+i](this['iComp'+i].getValue())
    }
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
  _ref8 = n => this.iComp8 = n
  _ref9 = n => this.iComp9 = n

  render(){
    const {
      isShow, isSelected,
      titleStyle, btStyle,
      onClose
    } = this.props;
    if (!(isShow && isSelected)) {
      return null;
    }
    return (
      <div>
        {CONF_ARR.map((item, i) => {
          const _i = i + 1;
          return (
            <RowSecret
               key={item[0]}
               ref={this['_ref'+_i]}
               titleStyle={titleStyle}
               title={`${item[0]}:`}
               name={item[1]}
               placeholder={`${item[2]} API Key`}
               maxLength={item[3]}
               onEnter={this['_setKey'+_i]}
            />
        )})}
        <RowButtons btStyle={btStyle} onClose={onClose}>
          <FlatButton
            style={btStyle}
            caption="CLEAR ALL"
            onClick={this._hClearAll}
          />
          <FlatButton
            style={{...btStyle, ...S.BT_SET}}
            caption="SET ALL"
            onClick={this._hSetAll}
          />
        </RowButtons>
      </div>
    );
  }
}

export default PaneApiKey
