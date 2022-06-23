import crConfigType1 from '../../charts/crConfigType1';
import {
  crSeriaConfig
} from '../../charts/ChartConfigFn';
import {
  crData,
  crZhConfig,
  crDatasetInfo,
  findMinY
} from './EuroStatFn';

const toSpline = {
   createConfig: (json, option) => {
     const {
       seriaType
     } = option
     , [
       data,
       minY,
       maxY
     ] = crData(json, option)
     , _type = (seriaType || '')
         .toLowerCase() || 'spline';

     option.seriaType = _type
     option.minY = minY
     option.maxY = maxY

     return crConfigType1({
       option,
       data,
       confOption: {
         info: crDatasetInfo(json),
         zhConfig: crZhConfig(option)
       }
    })
   },

   createSeria: (json, option) => {
     const { data } = crData(json)
     , {
       itemCaption,
       seriaType,
       seriaColor,
       seriaWidth
     } = option;

     return crSeriaConfig({
       seriaType,
       seriaColor,
       seriaWidth,
       data,
       minY: findMinY(data),
       name: itemCaption
     });
   }
};

export default toSpline
