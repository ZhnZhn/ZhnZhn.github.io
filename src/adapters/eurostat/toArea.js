import ChartConfig from '../../charts/ChartConfig';

import fn from './EuroStatFn';

/*
const _crTimeIndexAndValue = json => {
  const { dimension={}, value=[] } = json
      , { time={} } = dimension
      , { category={} } = time
      , { index:timeIndex=0 } = category;
  return { timeIndex, value };
}
*/

const toArea = {
   createConfig: (json, option) => {
     const { timeIndex, value } = fn.crTimeIndexAndValue(json)
         , {
             isNotZoomToMinMax,
             seriaType, seriaColor
            } = option
         , { data, max, min } = fn.createData(timeIndex, value)
         , config = ChartConfig.fBaseAreaConfig({
             seriaType: seriaType.toLowerCase(),
             seriaColor
           });

      fn.setDataAndInfo({ config, data, json, option });
      fn.setLineExtrems({ config, max, min, isNotZoomToMinMax });

      return config;
   },

   createSeria: (json, option) => {
     const { timeIndex, value } = fn.crTimeIndexAndValue(json)
         , { itemCaption, seriaColor } = option
         , seria = ChartConfig.fSeries()
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
