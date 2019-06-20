import Builder from '../../charts/ConfigBuilder'

import fns from './fnAdapter'


const {
  crData,
  crConfigOption
} = fns


const WdtAdapter = {
  toConfig(json, option){
    const { title, subtitle, value } = option
    , dataOption = crData(json, option)
    , config = Builder()
       .stockConfig(value, dataOption)
       .addCaption(title, subtitle)
       .add({
         ...crConfigOption({
             data: dataOption.data,
             option
         })
        })
        //.addZhPoints(dataMfi)
        .toConfig();
    return { config };
  },
  toSeries(json, option){
    const { config } = WdtAdapter.toConfig(json, option);
    return config.series[0];
  }
};

export default WdtAdapter
