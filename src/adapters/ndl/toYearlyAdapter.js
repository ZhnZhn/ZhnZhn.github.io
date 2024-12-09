import crYearlyConfig from '../toYearsByMonths';

import { getData } from './NdlFn';

export const toYearlyAdapter = {
  toConfig(json, option){
    return {
      config: crYearlyConfig(getData(json), option)
    };
  },
  isAdd(){
    return false;
  }
}
