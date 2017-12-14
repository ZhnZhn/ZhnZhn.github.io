import React, { Component } from 'react';
//import PropTypes from "prop-types";

import ButtonTab from '../zhn/ButtonTab'

import MenuTabItem from '../zhn-moleculs/MenuTabItem'
import ModalMenuIndicator from './ModalMenuIndicator'
import ModalMenuFn from './ModalMenuFn'
import ModalMenuMini from './ModalMenuMini'

const S = {
  TAB_INDICATOR: {
    left: '10px'
  },
  PANE_INDICATOR: {
     width: '240px'
  },
  BT_LEGEND: {
    left: '115px'
  },
  TAB_MINI: {
    left: '350px'
  },
  TAB_FN: {
    left: '190px'
  },
  BT_ADD: {
    left: '250px'
  },
  BT_CONF: {
    left: '430px'
  }
}

class ChartToolbar extends Component {
  /*
  static propTypes = {
    style: PropTypes.object,
    config: PropTypes.object
  }
  */

  constructor(props){
    super()
    const { config={} } = props
        , { zhFnMomAthConfig } = config;
    this._isMomAthConfig = (typeof zhFnMomAthConfig == 'function')
            ? true : false
  }

  shouldComponentUpdate(nextProps, nextState){
    return false;
  }

  render(){
    const {
            style, config={},
            onAddSma, onRemoveSeries, onAddMfi, onRemoveMfi,
            onAddMomAth,
            onClickLegend,
            onClick2H,
            onAddToWatch,
            onCopy,
            onPasteTo,
            onClickInfo,
            onClickVolume,
            onClickATH,
            onClickHighLow,
            //onClickConfig
          } = this.props
        , { zhConfig={}, info } = config
        , { isWithoutIndicator, isWithLegend, isWithoutAdd } = zhConfig;

    const _btTabIndicator = !isWithoutIndicator ? (
      <MenuTabItem
        style= {S.TAB_INDICATOR}
        caption="Indicator"
      >
        <ModalMenuIndicator
          onAddSma={onAddSma}
          onRemoveSma={onRemoveSeries}
          isMfi={config.zhIsMfi}
          onAddMfi={onAddMfi}
          onRemoveMfi={onRemoveMfi}
          isMomAth={this._isMomAthConfig}
          onAddMomAth={onAddMomAth}
        />
      </MenuTabItem>
    ) : null;

    const _btLegend = isWithLegend ? (
      <ButtonTab
        style={S.BT_LEGEND}
        caption="Legend"
        onClick={onClickLegend}
      />
    ) : null;

    const _btAdd = !isWithoutAdd ? (
      <ButtonTab
        style={S.BT_ADD}
        caption="Add"
        onClick={onAddToWatch}
      />
    ) : null;

    const _btInfo = info ? (
      <ButtonTab
        caption="Info"
        onClick={onClickInfo}
      />
    ) : null;

   const { zhVolumeConfig, zhATHConfig, zhHighLowConfig } = config;
   const _btTabMini = ( zhVolumeConfig || zhATHConfig || zhHighLowConfig)
     ? (
       <MenuTabItem
         style= {S.TAB_MINI}
         caption="Mini"
       >
         <ModalMenuMini
           onClickVolume={zhVolumeConfig ? onClickVolume : null}
           onClickATH={zhATHConfig ? onClickATH : null}
           onClickHighLow={zhHighLowConfig ? onClickHighLow : null}
         />
       </MenuTabItem>
     ) : null;

/*
   const _btConf = (
     <ButtonTab
       style={S.BT_CONF}
       caption="Conf"
       onClick={onClickConfig}
     />
   );
*/
    return (
      <div style={style}>
         {_btTabIndicator}
         {_btLegend}
         <MenuTabItem
           style={S.TAB_FN}
           caption="Fn"
         >
           <ModalMenuFn
             onX2H={onClick2H}
             onCopy={onCopy}
             onPasteTo={onPasteTo}
           />
         </MenuTabItem>
         {_btAdd}
         {_btInfo}
         {_btTabMini}
         {/*_btConf*/}
      </div>
    );
  }
}

export default ChartToolbar
