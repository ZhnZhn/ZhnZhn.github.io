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

const _crBtTitleTo = (json) => {
  const { ConversionType={} } = json
      , { conversionSymbol } = ConversionType;
  return `${conversionSymbol || DF_PAIR}`;
}

const toHdConfig = {
  toConfig: (json, option) => {
    const {
           data,
           dVolume, dColumn,
           dToVolume,
           dHL
         } = crData(json)
        , seria = Builder()
            .splineSeria({ data })
            .toSeria()
        , { value='', title } = option
        , _title = _crTitle(title)
        , _subtitle = _crSubtitle(json, value)
        , _btTitleTo = _crBtTitleTo(json)
        , config = Builder()
            .area2Config(_title, _subtitle)
            .addSeries(seria)
            .checkThreshold()
            .addMinMax(data, option)
            .add({
               ...crConfigOption({ option, data })
            })
            .addMiniVolume({
              btTitle: 'Volume ' + value,
              title: value,
              dColumn, dVolume
            })
            .addMiniVolume({
              btTitle: 'Volume ' + _btTitleTo,
              title: _btTitleTo,
              dVolume: dToVolume,
              dColumn: []
            })
            .addMiniHL({ data: dHL })
            .toConfig();
    return { config };
  },

  toSeries: (json, option) => {
    const { config } = toHdConfig.toConfig(json, option);
    return config.series[0];
  }
}

export default toHdConfig
