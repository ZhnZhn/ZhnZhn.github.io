import {
  crChartId,
  toConfig
} from './fnAdapter';

const UnComtradeAdapter = {
  crKey: crChartId,

  toConfig(json, option){
    return {
       config: toConfig(json, option)
       //isDrawDeltaExtrems: false,
       //isNotZoomToMinMax: false
    };
  }

};

export default UnComtradeAdapter
