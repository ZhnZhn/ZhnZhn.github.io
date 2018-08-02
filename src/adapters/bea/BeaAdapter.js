import Builder from '../../charts/ConfigBuilder';

import fnAdapter from './fnAdapter';

const { crData, crConfigOption } = fnAdapter;

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
           .addSeries(seria)
           .add({
             ...crConfigOption({ option, data, Results })
           })
           .toConfig();

    return { config };
  },

  toSeries(json, option){
     const { config } = BeaAdapter.toConfig(json, option);
     return config.series[0];
  }

}

export default BeaAdapter
