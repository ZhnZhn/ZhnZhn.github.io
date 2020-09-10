import crConfigType1 from '../../charts/crConfigType1';
import fnAdapter from './fnAdapter';

const { Builder } = crConfigType1
, {
  crTitle,
  crData,
  crConfigOption
} = fnAdapter
, _assign = Object.assign;

const EiaAdapter = {
  toConfig(json, option){
    const data = crData(json)
    , confOption = crConfigOption(json, option);

    _assign(option, crTitle(option))

    return {
      config: crConfigType1({
        option, data, confOption
      })
    };
  },

  toSeries(json, option){
    return Builder.crSeria({
      adapter: EiaAdapter,
      json, option
    });
  }
};

export default EiaAdapter
