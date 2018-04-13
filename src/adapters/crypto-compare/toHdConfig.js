import Builder from '../../charts/ConfigBuilder'

import fnAdapter from './fnAdapter'

const { crData, crConfigOption } = fnAdapter;

const DF_PAIR = 'USD';
const V_ON_TIME = 'Values on 00:00 GMT';

const _crTitle = (title) => `${title}: ${V_ON_TIME}`;

const _crSubtitle = (json, value) => {
  const { ConversionType={} } = json
      , { conversionSymbol, type='' } = ConversionType;
  return `${value}/${conversionSymbol || DF_PAIR} ${type}`;
};

const toHdConfig = {
  toConfig: (json, option) => {
    const data = crData(json)
        , seria = Builder()
            .initSpline({ data })
            .toConfig()
        , { value='', title } = option
        , _title = _crTitle(title)
        , _subtitle = _crSubtitle(json, value)
        , config = Builder()
            .initBaseArea2()
            .addCaption(_title, _subtitle)
            .addSeries(seria)
            .add({
               ...crConfigOption({ option, data })
            })
            .toConfig();
    return { config };
  },

  toSeries: (json, option) => {
    const { config } = toHdConfig.toConfig(json, option);
    return config.series[0];
  }
}

export default toHdConfig
