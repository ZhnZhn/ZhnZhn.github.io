import Builder from '../../charts/ConfigBuilder';
import fnAdapter from './fnAdapter'

const {
  crSeria, getValue,
  crData, crConfigOption
} = fnAdapter

const SUBTITLE = 'Values on 23:59:59 UTC'

const toChartConfig = {
  crKey(option){
    const { items=[], fromDate } = option;
    return (option._itemKey = `${getValue(items[0])}_${fromDate}`);
  },

  toConfig(json, option){
    const {
       seriaType, seriaColor, seriaWidth,
       title
    } = option
    , {
       data, dVolume, dColumn,
       dMarketCap
    } = crData(json)
    , seria = Builder()
       .splineSeria({
         seriaType, seriaColor, seriaWidth,
         data
       })
       .toSeria()
   , config = Builder()
       .area2Config(title, SUBTITLE)
       .addSeries(seria)
       .addMinMax(data, option)
       .add({
         ...crConfigOption({ json, option, data })
       })
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
    return crSeria({
      adapter: toChartConfig,
      json, option
    });
  }
}

export default toChartConfig
