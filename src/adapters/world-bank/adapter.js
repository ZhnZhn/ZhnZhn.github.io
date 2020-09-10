import crConfigType1 from '../../charts/crConfigType1'
import fnAdapter from './fnAdapter'

const { Builder } = crConfigType1
, {
  crId,
  crData,
  crConfigOptions
} = fnAdapter;

const adapter = {
  crKey: crId,

  toConfig(json, option){
    const data = crData(json[1])
    , confOption = crConfigOptions(option, data);

    return {
      config: crConfigType1({
        option, data, confOption
      })
     };
  },

  toSeries(json, option){
    return Builder.crSeria({
      adapter, json, option
    });
  }
}

export default adapter
