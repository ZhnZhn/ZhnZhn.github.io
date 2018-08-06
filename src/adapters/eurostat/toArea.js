import ChartConfig from '../../charts/ChartConfig';

import fn from './EuroStatFn';


const toArea = {
   createConfig: (json, option) => {
     const { timeIndex, value } = fn.crTimeIndexAndValue(json)
         , {
             isNotZoomToMinMax,
             seriaType, seriaColor
            } = option
         , { data, max, min } = fn.createData(timeIndex, value)
         , _type = typeof seriaType === 'string'
             ? seriaType.toLowerCase()
             : 'spline'
         , config = ChartConfig.fBaseAreaConfig({
             seriaType: _type,
             seriaColor
           });

      fn.setDataAndInfo({ config, data, json, option });
      fn.setLineExtrems({ config, max, min, isNotZoomToMinMax });

      return config;
   },

   createSeria: (json, option) => {
     const { timeIndex, value } = fn.crTimeIndexAndValue(json)
         , { itemCaption, seriaType, seriaColor } = option
         , seria = ChartConfig.fSeries({ seriaType })
         , { data } = fn.createData(timeIndex, value);

     return Object.assign(seria, {
       zhSeriaId: option.key,
       zhValueText: itemCaption,
       color: seriaColor,
       data: data,
       minY: fn.findMinY(data)
     });
   }
};

export default toArea
