import ChartConfig from '../../charts/ChartConfig';

import EuroStatFn from './EuroStatFn';

const {
  createData,
  setDataAndInfo,
  setLineExtrems,
  findMinY
} = EuroStatFn

const toArea = {
   createConfig: (json, option) => {
     const {
         isNotZoomToMinMax,
         seriaType, seriaColor, seriaWidth,
         mapFrequency
        } = option
     , { data, max, min } = createData(json, mapFrequency)
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
     const { data } = createData(json)
     , { itemCaption, seriaType, seriaColor, seriaWidth } = option;

     return ChartConfig.crSeria({
       seriaType, seriaColor, seriaWidth,
       data,
       minY: findMinY(data),
       zhValueText: itemCaption
     });
   }
};

export default toArea
