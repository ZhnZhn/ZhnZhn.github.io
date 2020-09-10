import crConfigType1 from '../../charts/crConfigType1'
import fnAdapter from './fnAdapter'

const { Builder } = crConfigType1
, {
  crData,
  crConfigOption
 } = fnAdapter
, _assign = Object.assign;


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
    const { value='', title } = option
    _assign(option, {
      itemCaption: title,
      title: _crTitle(title),
      subtitle: _crSubtitle(json, value)
    })
    const {
       data,
       dVolume, dColumn,
       dToVolume,
       dHL
     } = crData(json)
    , _btTitleTo = _crBtTitleTo(json)
    , confOption = crConfigOption(option)
    , config = Builder(crConfigType1({
         option, data, confOption
       }))
        .addMiniVolume({
          btTitle: 'Volume ' + value,
          dColumn, dVolume
        })
        .addMiniVolume({
          btTitle: 'Volume ' + _btTitleTo,
          dVolume: dToVolume,
          dColumn: []
        })
        .addMiniHL({ data: dHL })
        .toConfig();
    return { config };
  },

  toSeries: (json, option) => {
    return Builder.crSeria({
      adapter: toHdConfig,
      json, option
    })
  }
}

export default toHdConfig
