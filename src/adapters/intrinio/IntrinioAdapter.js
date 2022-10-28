import crConfigType1 from '../../charts/crConfigType1';
import {
  crSubtitle,
  crData,
  crConfigOption
} from './fnAdapter';

const { Builder } = crConfigType1;

const IntrinioAdapter = {
  toConfig(json, option){
    option.subtitle = crSubtitle(option)

    const data = crData(json, option)
    , confOption = crConfigOption(option);

    return {
      config: crConfigType1({
        option,
        data,
        confOption
      })
    };
  },

  toSeries(json, option){
    return Builder.crSeria({
      adapter: IntrinioAdapter,
      json,
      option
    });
  }
}

export default IntrinioAdapter
