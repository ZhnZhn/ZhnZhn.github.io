//import PropTypes from 'prop-types'
import { Component } from '../uiApi';

import getFnByPropName from '../../utils/getFnByPropName'
import ScrollPane from '../zhn/ScrollPane'
import OpenClose from '../zhn/OpenClose'
import ItemStack from '../zhn/ItemStack'
import FlatButton from '../zhn-m/FlatButton'
import RowSecret from '../dialogs/RowSecret'
import RowButtons from './RowButtons'

const MAX_KEY = 10;

const S_SCROLL_PANE = {
  overflowY: 'auto',
  maxHeight: 360,
  paddingRight: 10
}
, S_OC_CHILD = { paddingLeft: 8 }
, S_ROW_BTS = { margLeft: 0 }
, S_BT_SET = { margin: '0 2px' };

const CONF_SM_ARR = [
  ["AV", "alpha-vantage", "Alpha Vantage"],
  ["FMP","fmp","Financial Modeling Prep","32"],
  ["IEX","iex-cloud","IEX Cloud","35"],
  ["Intrinio","intrinio","Intrinio","32"],
  ["Twelve", "twelve", "Twelve Data"]
];

const CONF_EC_ARR = [
  ["NDL","nasdaq-data-link","Nasdaq Data Link"],
];

const CONF_EC_USA_ARR = [
  ["BEA","bea","BEA","36"],
  ["BLS","bls","BLS","32"],
  ["EIA","eia","EIA","32"]
];

const _crPwdItem = (
  item,
  index , {
    isShowLabels,
    titleStyle,
    i,
    comp
  }) => {
    const _i = index + i;
    return (
      <RowSecret
         key={item[0]}
         ref={comp['_ref'+_i]}
         isTitle={isShowLabels}
         titleStyle={titleStyle}
         title={item[0]}
         name={item[1]}
         placeholder={`${item[2]} API Key`}
         maxLength={item[3]}
         onEnter={comp['_setKey'+_i]}
      />
  );
};


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

    for(let i = 1; i<MAX_KEY; i++){
      this['_setKey'+i] = getFnByPropName(data, 'key'+i)
    }
  }

  _hSetAll = () => {
    for(let i = 1; i<MAX_KEY; i++) {
      this['_setKey'+i](this['iComp'+i].getValue())
    }
  }

  _hClearAll = () => {
    for(let i = 1; i<MAX_KEY; i++) {
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
      isShow,
      isSelected,
      isShowLabels,
      titleStyle,
      btStyle,
      onClose
    } = this.props;
    return (isShow && isSelected) ? (
      <ScrollPane style={S_SCROLL_PANE}>
        <OpenClose caption="Economics" childStyle={S_OC_CHILD}>
          <ItemStack
            items={CONF_EC_ARR}
            crItem={_crPwdItem}
            isShowLabels={isShowLabels}
            titleStyle={titleStyle}
            i={1}
            comp={this}
          />
        </OpenClose>
        <OpenClose caption="U.S. Economics" childStyle={S_OC_CHILD}>
           <ItemStack
             items={CONF_EC_USA_ARR}
             crItem={_crPwdItem}
             isShowLabels={isShowLabels}
             titleStyle={titleStyle}
             i={2}
             comp={this}
           />
        </OpenClose>
        <OpenClose caption="Stock Market" childStyle={S_OC_CHILD}>
          <ItemStack
            items={CONF_SM_ARR}
            crItem={_crPwdItem}
            isShowLabels={isShowLabels}
            titleStyle={titleStyle}
            i={5}
            comp={this}
          />
        </OpenClose>
        <RowButtons style={S_ROW_BTS} btStyle={btStyle} onClose={onClose}>
          <FlatButton
            style={btStyle}
            caption="CLEAR ALL"
            onClick={this._hClearAll}
          />
          <FlatButton
            style={{...btStyle, ...S_BT_SET}}
            caption="SET ALL"
            onClick={this._hSetAll}
          />
        </RowButtons>
      </ScrollPane>
    ) : null;
  }
}

export default PaneApiKey
