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
         , { isNotZoomToMinMax } = option
         , { data, max, min } = EuroStatFn.createData(timeIndex, value)
         , config = ChartConfig.fBaseAreaConfig();

      EuroStatFn.setDataAndInfo({ config, data, json, option });
      EuroStatFn.setLineExtrems({ config, max, min, isNotZoomToMinMax });

      return config;
   },

   createSeria: (json, option) => {
     const { timeIndex, value } = _crTimeIndexAndValue(json)
         , valueText = option.itemCaption
         , seria = ChartConfig.fSeries()
         , { data } = EuroStatFn.createData(timeIndex, value);

     return Object.assign(seria, {
       zhSeriaId: option.key,
       zhValueText: valueText,
       data: data,
       minY: EuroStatFn.findMinY(data)
     });
   }
};

export default toArea
