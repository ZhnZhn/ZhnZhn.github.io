
import ChartConfig from '../../charts/ChartConfig'

import fnAdapter from './fnAdapter'

const UnComtradeAdapter = {
  toConfig(json, option){
    const config = fnAdapter.toConfig(json, option);    
    return {
       config,
       isDrawDeltaExtrems: false,
       isNotZoomToMinMax: false
    };
  },

  toSeries(json, option){
    const seria = ChartConfig.fSeries()
    Object.assign(seria, {
      zhSeriaId: 'Empty_Seria',
      zhValueText: 'Empty Seria'
    })
    return seria;
  }
};

export default UnComtradeAdapter
