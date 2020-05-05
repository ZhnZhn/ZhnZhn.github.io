import ChartConfig from '../../charts/ChartConfig'
import EuroStatFn from './EuroStatFn';
import toYearly from '../toYearsByMonths'

const {
  crTimeIndexAndValue,
  toPointArr,
  crDataSource,
  crLinkConf,
  setInfo
} = EuroStatFn

const toAreaYearly = {
   createConfig: (json, option) => {
     const { timeIndex, value } = crTimeIndexAndValue(json)
     , data = toPointArr(timeIndex, value).reverse()
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
     const seria = ChartConfig.fSeries()
     Object.assign(seria, {
       zhSeriaId: 'Empty_Seria',
       zhValueText: 'Empty Seria'
     })
     return seria;
   }

};

export default toAreaYearly
