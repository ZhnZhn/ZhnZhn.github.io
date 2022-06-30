import { crChartId } from './fnAdapter';
import toConfig from './toConfig';

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
