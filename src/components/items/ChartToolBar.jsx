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
};

class ChartToolbar extends Component {
  /*
  static propTypes = {
    style: PropTypes.object,
    config: PropTypes.object
  }
  */

  shouldComponentUpdate(){
    return false;
  }

  render(){
    const {
            style, config={},
            chartId,
            onMiniChart,
            getChart,
            onAddMfi, onRemoveMfi,
            onClickLegend,
            onClick2H,
            onAddToWatch,
            onCopy,
            onPasteTo,
            onClickInfo,
            //onClickConfig
          } = this.props
        , { zhConfig={}, info, zhMiniConfigs } = config
        , { isWithoutIndicator, isWithLegend, isWithoutAdd } = zhConfig;

    const _btTabIndicator = !isWithoutIndicator ? (
      <MenuTabItem
        style= {S.TAB_INDICATOR}
        caption="Indicator"
      >
        <ModalMenuIndicator
          chartId={chartId}
          config={config}
          getChart={getChart}
          onAddMfi={onAddMfi}
          onRemoveMfi={onRemoveMfi}
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

  const _btTabMini = zhMiniConfigs && zhMiniConfigs.length
      ? (
       <MenuTabItem
         style= {S.TAB_MINI}
         caption="Mini"
       >
         <ModalMenuMini
           configs={zhMiniConfigs}
           onClickItem={onMiniChart}
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
