import React, { Component, PropTypes } from 'react'

import ButtonParentTab from '../zhn-moleculs/ButtonParentTab'
import ButtonTab from '../zhn/ButtonTab'
import PanelIndicator from './PanelIndicator'
import PanelMini from './PanelMini'

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
  BT_X2H: {
    left: '190px'
  },
  BT_ADD: {
    left: '240px'
  },
  TAB_MINI: {
    left: '350px'
  },
  BT_CONF: {
    left: '430px'
  }
}

class ChartToolbar extends Component {
  static propTypes = {
    style: PropTypes.object,
    config: PropTypes.object
  }

  constructor(props){
    super()
    const { config={} } = props
        , { zhFnMomAthConfig } = config;
    this._isMomAthConfig = (typeof zhFnMomAthConfig == 'function') ? true : false
  }

  shouldComponentUpdate(){
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
            onClickInfo,
            onClickVolume,
            onClickATH,
            onClickHighLow,
            //onClickConfig,
          } = this.props
        , { zhConfig={}, info } = config
        , { isWithoutIndicator, isWithLegend, isWithoutAdd } = zhConfig;
    const _btIndicator = (!isWithoutIndicator) ? (
      <ButtonParentTab
        style= {S.TAB_INDICATOR}
        caption="Indicator"
      >
        <PanelIndicator
          rootStyle={S.PANE_INDICATOR}
          onAddSma={onAddSma}
          onRemoveSma={onRemoveSeries}
          isMfi={config.zhIsMfi}
          onAddMfi={onAddMfi}
          onRemoveMfi={onRemoveMfi}
          isMomAth={this._isMomAthConfig}
          onAddMomAth={onAddMomAth}
        />
      </ButtonParentTab>
    ) : undefined;

    const _btLegend = (isWithLegend) ? (
      <ButtonTab
        style={S.BT_LEGEND}
        caption="Legend"
        onClick={onClickLegend}
      />
    ) : undefined ;

    const _bt2HChart = (
      <ButtonTab
        style={S.BT_X2H}
        caption="x2H"
        onClick={onClick2H}
      />
    );

    const _btAdd = (!isWithoutAdd) ? (
      <ButtonTab
        style={S.BT_ADD}
        caption="Add"
        isShow={false}
        onClick={onAddToWatch}
      />
    ) : null;

    const _btInfo = (info) ? (
      <ButtonTab
        caption="Info"
        onClick={onClickInfo}
      />
    ) : null;

   const { zhVolumeConfig, zhATHConfig, zhHighLowConfig } = config;
   const _btMini = ( zhVolumeConfig || zhATHConfig || zhHighLowConfig)
     ? (
         <ButtonParentTab
           style= {S.TAB_MINI}
           caption="Mini"
         >
           <PanelMini
             config={config}
             onClickVolume={onClickVolume}
             onClickATH={onClickATH}
             onClickHighLow={onClickHighLow}
           />
        </ButtonParentTab>
     ) : null;


/*
   const _btConf = (
     <ButtonTab
       style={S.BT_CONF}
       caption="Conf"
       onClick={onClickConfig}
     />
   )
*/

    return (
      <div style={style}>
         {_btIndicator}
         {_btLegend}
         {_bt2HChart}
         {_btAdd}
         {_btInfo}
         {_btMini}
         {/*_btConf*/}
      </div>
    );
  }
}

export default ChartToolbar
