import ChartConfig from '../../charts/ChartConfig';

import EuroStatFn from './EuroStatFn';

const {
  crTimeIndexAndValue,
  createData,
  setDataAndInfo,
  setLineExtrems,
  findMinY
} = EuroStatFn

const toArea = {
   createConfig: (json, option) => {
     const { timeIndex, value } = crTimeIndexAndValue(json)
     , {
         isNotZoomToMinMax,
         seriaType, seriaColor, seriaWidth,
         mapFrequency
        } = option
     , { data, max, min } = createData(timeIndex, value, mapFrequency)
     , _type = typeof seriaType === 'string'
         ? seriaType.toLowerCase()
         : 'spline'
     , config = ChartConfig.crAreaConfig({
         seriaType: _type,
         seriaColor, seriaWidth
       });
      setDataAndInfo({ config, data, json, option });
      setLineExtrems({ config, max, min, isNotZoomToMinMax });

      return config;
   },

   createSeria: (json, option) => {
     const { timeIndex, value } = crTimeIndexAndValue(json)
     , { itemCaption, seriaType, seriaColor, seriaWidth } = option
     , { data } = createData(timeIndex, value);

     return ChartConfig.crSeria({
       seriaType, seriaColor, seriaWidth,
       data,
       minY: findMinY(data),
       zhValueText: itemCaption
     });
   }
};

export default toArea
