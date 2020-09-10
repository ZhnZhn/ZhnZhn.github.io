import crConfigType1 from '../../charts/crConfigType1'
import fnAdapter from './fnAdapter'

const { Builder } = crConfigType1
, {
  getValue,
  crData, crConfigOption
} = fnAdapter;

const SUBTITLE = 'Values on 23:59:59 UTC'

const toChartConfig = {
  crKey(option){
    const { items=[], fromDate } = option;
    return (option._itemKey = `${getValue(items[0])}_${fromDate}`);
  },

  toConfig(json, option){
    option.subtitle = SUBTITLE
    const {
      data, dVolume, dColumn,
      dMarketCap
    } = crData(json)
   , confOption = crConfigOption(option)
   , config = Builder(crConfigType1({
       option, data, confOption
     }))
     .addMiniVolume({
       btTitle: 'Volume',
       title: 'Volume USD',
       dVolume, dColumn
     })
     .addMiniVolume({
       btTitle: 'Market Cap',
       title: 'Market Cap USD',
       dVolume: dMarketCap
     })
     .toConfig();
   return { config };
  },

  toSeries(json, option){
    return Builder.crSeria({
      adapter: toChartConfig,
      json, option
    });
  }
}

export default toChartConfig
