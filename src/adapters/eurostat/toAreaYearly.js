import ChartConfig from '../../charts/ChartConfig';
import {
  toPointArr,
  crDataSource,
  crLinkConf,
  setInfo
} from './EuroStatFn';
import toYearly from '../toYearsByMonths';

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
         ...crLinkConf(option)
       });
      setInfo({ config, json, option })
      return config;
   },

   createSeria: (json, option) => ChartConfig
     .crSeria({ name: 'Empty Seria' })
};

export default toAreaYearly
