import React, { Component, PropTypes } from 'react'

import ButtonParentTab from '../zhn-moleculs/ButtonParentTab'
import ButtonTab from '../zhn/ButtonTab'
import PanelIndicator from './PanelIndicator'
import PanelMini from './PanelMini'

class ChartToolbar extends Component {
  static propTypes = {
    style: PropTypes.object,
    config: PropTypes.object
  }

  shouldComponentUpdate(){
    return false;
  }

  render(){
    const {
            style, config,
            onAddSma, onRemoveSeries, onAddMfi, onRemoveMfi,
            onClickLegend,
            onClick2H,
            onAddToWatch,
            onClickInfo,
            onClickVolume,
            onClickATH,
            onClickHighLow,
            //onClickConfig,
          } = this.props
    const _btIndicator = (!config.zhConfig.isWithoutIndicator) ? (
      <ButtonParentTab
        caption={'Indicator'}
        style= {{left: '10px'}}
      >
        <PanelIndicator
          onAddSma={onAddSma}
          onRemoveSma={onRemoveSeries}
          isMfi={config.zhIsMfi}
          onAddMfi={onAddMfi}
          onRemoveMfi={onRemoveMfi}
        />
      </ButtonParentTab>
    ) : undefined;

    const _btLegend = (config.zhConfig.isWithLegend) ? (
      <ButtonTab
        style={{left: '115px'}}
        caption={'Legend'}
        onClick={onClickLegend}
      />
    ) : undefined ;

    const _bt2HChart = (
      <ButtonTab
        style={{left: '190px'}}
        caption={'x2H'}
        onClick={onClick2H}
      />
    );

    const _btAdd = (!config.zhConfig.isWithoutAdd) ? (
      <ButtonTab
        style={{left: '240px'}}
        caption={'Add'}
        isShow={false}
        onClick={onAddToWatch}
      />
    ) : null;

    const _btInfo = (config.info) ? (
      <ButtonTab
        caption={'Info'}
        onClick={onClickInfo}
      />
    ) : null;

   const { zhVolumeConfig, zhATHConfig, zhHighLowConfig } = config;
   const _btMini = ( zhVolumeConfig || zhATHConfig || zhHighLowConfig)
     ? (
         <ButtonParentTab
           style= {{left: '350px'}}
           caption={'Mini'}
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
       style={{left: '450px'}}
       caption={'Conf'}
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
