import Builder from '../../charts/ConfigBuilder'
import fns from './fnAdapter'

const {
  crData,
  crConfigOption
} = fns;

const WtdHistorical = {
  crKey(option){
    return option.value;
  },
  
  toConfig: (json, option) => {
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
  }
}

export default WtdHistorical
