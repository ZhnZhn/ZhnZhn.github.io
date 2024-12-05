
import pipe from '../../utils/pipe';
import {
  crAreaConfig,
  crSplineConfig,
  fAddCaption,
  fAddMinMax,
  fAdd,
  toConfig
} from '../../charts/configBuilderFn';

import {
  valueMoving,
  crZhConfig
} from './NdlFn';

import crAreaData from './crAreaData';

const _isArr = Array.isArray
const _assign = Object.assign;

const toArea = (json, option) => {
   const {
     isDrawDeltaExtrems,
     isNotZoomToMinMax,
     dfR,
     title,
     subtitle
   } = option
   , {
     seria,
     minY,
     maxY
   } = crAreaData(json, option);

   const config = _isArr(option.items)
     ? crSplineConfig(seria, option)
     : crAreaConfig();

   _assign(config.series[0], {
     data: seria
   })

   return {
     config: pipe(
        config,
        fAddCaption(title, subtitle),
        fAddMinMax(seria, {
          minY,
          maxY,
          isNotZoomToMinMax,
          isDrawDeltaExtrems
        }),
        fAdd({
          valueMoving: valueMoving(seria, dfR),
          zhConfig: crZhConfig(option)
        }),
        toConfig
     )
   };
};

export default toArea
