import ChartConfig from '../../charts/ChartConfig';

import EuroStatFn from './EuroStatFn';

const _crTimeIndexAndValue = json => {
  const { dimension={}, value=[] } = json
      , { time={} } = dimension
      , { category={} } = time
      , { index:timeIndex=0 } = category;
  return { timeIndex, value };
}

const toArea = {
   createConfig: (json, option) => {
     const { timeIndex, value } = _crTimeIndexAndValue(json)
         , {
             isNotZoomToMinMax,
             seriaType, seriaColor
            } = option
         , { data, max, min } = EuroStatFn.createData(timeIndex, value)
         , config = ChartConfig.fBaseAreaConfig({
             seriaType: seriaType.toLowerCase(),
             seriaColor
           });

      EuroStatFn.setDataAndInfo({ config, data, json, option });
      EuroStatFn.setLineExtrems({ config, max, min, isNotZoomToMinMax });

      return config;
   },

   createSeria: (json, option) => {
     const { timeIndex, value } = _crTimeIndexAndValue(json)
         , { itemCaption, seriaColor } = option
         , seria = ChartConfig.fSeries()
         , { data } = EuroStatFn.createData(timeIndex, value);

     return Object.assign(seria, {
       zhSeriaId: option.key,
       zhValueText: itemCaption,
       color: seriaColor,
       data: data,
       minY: EuroStatFn.findMinY(data)
     });
   }
};

export default toArea
