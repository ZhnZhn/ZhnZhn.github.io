
import Router from './RouterAdapter'

const IexAdapter = {
  crKey({ one='', two=''}={}){
    return one + '_' + two;
  },

  toConfig(json, option){
    const config = Router
            .getAdapter(option)
            .toConfig(json, option);
    return { config };
  },

  toSeries(json, option, chart){
    const seria = Router
            .getAdapter(option)
            .toSeries(json, option, chart);
     return seria;
  }

}

export default IexAdapter
