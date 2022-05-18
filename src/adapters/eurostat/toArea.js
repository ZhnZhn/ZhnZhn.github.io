import ChartConfig from '../../charts/ChartConfig';
import {
  crData,
  setDataAndInfo,
  setLineExtrems,
  findMinY
} from './EuroStatFn';

const toArea = {
   createConfig: (json, option) => {
     const {
       isNotZoomToMinMax,
       seriaType,
       seriaColor,
       seriaWidth
     } = option
     , { data, max, min } = crData(json, option)
     , _type = (seriaType || '').toLowerCase() || 'spline'
     , config = ChartConfig.crAreaConfig({
         seriaType: _type,
         seriaColor, seriaWidth
       });
      setDataAndInfo({ config, data, json, option });
      setLineExtrems({ config, max, min, isNotZoomToMinMax });

      return config;
   },

   createSeria: (json, option) => {
     const { data } = crData(json)
     , {
       itemCaption,
       seriaType,
       seriaColor,
       seriaWidth
     } = option;

     return ChartConfig.crSeria({
       seriaType,
       seriaColor,
       seriaWidth,
       data,
       minY: findMinY(data),
       name: itemCaption
     });
   }
};

export default toArea
