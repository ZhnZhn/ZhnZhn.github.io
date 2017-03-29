import React, { Component, PropTypes } from 'react'

import SubPanel from './SubPanel'
import SubMenuItem from './SubMenuItem'

class PanelMini extends Component {
  static propTypes = {
    rootStyle: PropTypes.object,
    config: PropTypes.shape({
      zhVolumeConfig: PropTypes.object,
      zhATHConfig: PropTypes.object,
      zhHighLowConfig: PropTypes.object
    }),
    onClickVolume: PropTypes.func,
    onClickATH: PropTypes.func,
    onClickHighLow: PropTypes.func
  }

  render(){
    const {
            rootStyle, config,
            onClickVolume, onClickATH, onClickHighLow
          } = this.props

    const _btVolume = (config.zhVolumeConfig) ? (
      <SubMenuItem
        caption="Volume"
        onClick={onClickVolume}
      />
    ) : null;

    const _btATH = (config.zhATHConfig) ? (
      <SubMenuItem
        caption="ATH"
        onClick={onClickATH}
      />
    ) : null;

    const _btHL = (config.zhHighLowConfig) ? (
      <SubMenuItem
        caption="Daily HighLow"
        onClick={onClickHighLow}
      />
    ) : null;

    return (
      <SubPanel style={rootStyle}>
        {_btVolume}
        {_btATH}
        {_btHL}
      </SubPanel>
    );
  }
}

export default PanelMini
