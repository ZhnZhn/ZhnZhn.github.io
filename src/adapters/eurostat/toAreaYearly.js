import ChartConfig from '../../charts/ChartConfig'
import EuroStatFn from './EuroStatFn';
import toYearly from '../toYearsByMonths'

const {  
  toPointArr,
  crDataSource,
  crLinkConf,
  setInfo
} = EuroStatFn

const toAreaYearly = {
   createConfig: (json, option) => {
     const data = toPointArr(json).reverse()
     , { title, subtitle } = option
     , config = toYearly.toConfig(
         data, {
         title, subtitle,
         itemCaption: title + ': ' + subtitle,
         value: title + '_' + subtitle,
         dataSource: crDataSource(option),
         ...crLinkConf(json, option)
       });
      setInfo({ config, json, option })
      return config;
   },

   createSeria: (json, option) => {
     return ChartConfig.crSeria({
       zhValueText: 'Empty Seria'
     });
   }

};

export default toAreaYearly
