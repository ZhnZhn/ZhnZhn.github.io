import crConfigType1 from '../../charts/crConfigType1';
import fnAdapter from './fnAdapter'

const { Builder } = crConfigType1
, {
  crData,
  crConfigOption
} = fnAdapter;

const OnsAdapter = {
  toConfig(json, option){
    const data = crData(json)
    , confOption = crConfigOption(json, option);

    return {
      config: crConfigType1({
        option, data, confOption
      })
     };
  },

  toSeries(json, option){
    return Builder.crSeria({
      adapter: OnsAdapter,
      json, option
    });
  }
}

export default OnsAdapter
