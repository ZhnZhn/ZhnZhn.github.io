import {
  toPointArr,
  crDataSource,
  crLinkConf,
  setInfo
} from './EuroStatFn';
import crYearlyConfig from '../toYearsByMonths';

export const crAreaYearlyConfig = (
  json,
  option
) => {
   const data = toPointArr(json).reverse()
   , {
     title,
     subtitle
   } = option
   , config = crYearlyConfig(
       data, {
       title,
       subtitle,
       itemCaption: title + ': ' + subtitle,
       value: title + '_' + subtitle,
       dataSource: crDataSource(option),
       ...crLinkConf(option)
   });
   setInfo({ config, json, option })
   return config;
}
