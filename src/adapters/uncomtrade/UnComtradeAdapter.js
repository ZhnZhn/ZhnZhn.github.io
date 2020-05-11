
import fnAdapter from './fnAdapter'

const UnComtradeAdapter = {
  crKey: fnAdapter.crChartId,

  toConfig(json, option){
    const config = fnAdapter.toConfig(json, option);
    return {
       config
       //isDrawDeltaExtrems: false,
       //isNotZoomToMinMax: false
    };
  }

};

export default UnComtradeAdapter
