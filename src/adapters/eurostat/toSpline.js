import crConfigType1 from '../../charts/crConfigType1';
import {
  crSeriaConfig
} from '../../charts/ChartConfigFn';
import {
  crData,
  crZhConfig,
  crDatasetInfo
} from './EuroStatFn';

const DF_SERIA_TYPE = 'spline';
const _crSeriaType = (
  option,
  dfSeriaType=DF_SERIA_TYPE
) => (option.seriaType || dfSeriaType)
   .toLowerCase();

export const crSplineConfig = (
  json,
  option
) => {
   const [
     data,
     minY,
     maxY
   ] = crData(json, option);

   option.seriaType = _crSeriaType(option)
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
}

export const crSplineSeria = (
  json,
  option
) => {
   const [
     data,
     minY
   ] = crData(json)
   , {
     itemCaption,
     seriaColor,
     seriaWidth
   } = option;

   return crSeriaConfig({
     name: itemCaption,
     seriaType: _crSeriaType(option),
     seriaColor,
     seriaWidth,
     data,
     minY
   });
}
