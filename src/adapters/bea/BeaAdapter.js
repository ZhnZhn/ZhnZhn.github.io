import Builder from '../../charts/ConfigBuilder';

import fnAdapter from './fnAdapter';

const {
  crData,
  crConfigOption  
} = fnAdapter;

const BeaAdapter = {
  toConfig(json, option){
    const Results = json.BEAAPI.Results
        , data = crData(Results, option)
        , seria = Builder()
            .splineSeria({ data })
            .toSeria()
        , { title, dfTitle } = option
        , config = Builder()
           .area2Config(dfTitle, title)
           .addMinMax(data, option)
           .addSeries(seria)
           .add({
             ...crConfigOption({ option, data, Results })
           })
           .toConfig();

    return { config };
  },

  toSeries(json, option){
     return Builder.crSeria({
       adapter: BeaAdapter,
       json, option
     })
  }

}

export default BeaAdapter
