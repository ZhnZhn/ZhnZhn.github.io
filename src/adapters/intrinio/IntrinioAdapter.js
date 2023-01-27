import crConfigType1 from '../../charts/crConfigType1';
import { crSeriaConfigFromAdapter } from '../../charts/configBuilderFn';

import {
  crSubtitle,
  crData,
  crConfigOption
} from './fnAdapter';

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
    return crSeriaConfigFromAdapter({
      adapter: IntrinioAdapter,
      json,
      option
    });
  }
}

export default IntrinioAdapter
