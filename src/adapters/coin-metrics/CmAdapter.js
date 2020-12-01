import crConfigType1 from '../../charts/crConfigType1'
import fnAdapter from './fnAdapter'

const { Builder } = crConfigType1
, {
  crData,
  crTitle,
  crConfigOption
} = fnAdapter
, _assign = Object.assign;

const CmAdapter = {
  toConfig(json, option){
    const { fromDate } = option
    , data = crData(json, fromDate)
    , confOption = crConfigOption(json, option);

    _assign(option, crTitle(option, json))

    return {
      config: crConfigType1({
        option, data, confOption
      })
     };
  },

  toSeries(json, option){
    return Builder.crSeria({
      adapter: CmAdapter,
      json, option
    });
  }
}

export default CmAdapter
