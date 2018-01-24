import Builder from '../../charts/ConfigBuilder'

import fnAdapter from './fnAdapter'

const { crData, crConfigOption } = fnAdapter;

const _crSubtitle = (json, value) => {
  const { ConversionType={} } = json
      , { conversionSymbol, type='' } = ConversionType;
  return `${value}/${conversionSymbol || 'USD'} ${type}`;
};

const toHdConfig = {
  toConfig: (json, option) => {
    const data = crData(json)
        , seria = Builder()
            .initSpline({ data })
            .toConfig()
        , { value='', title } = option
        , _subtitle = _crSubtitle(json, value)
        , config = Builder()
            .initBaseArea2()
            .addCaption(title, _subtitle)
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
