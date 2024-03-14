import {
  CHT_AREA,
  CHT_SPLINE,
  CHT_COLUMN,
  CHT_AREA_YEARLY  
} from '../../constants/ChartType';

import crSplineConfig from './toSpline';
import crYearlyConfig from './toYearly';
import routerColumnBarSet from './toColumn';
import routerTreeMap from './toTreeMap';

const _r = {
  ...routerColumnBarSet,
  ...routerTreeMap,

  DF: crSplineConfig,
  [CHT_AREA]: crSplineConfig,
  [CHT_SPLINE]: crSplineConfig,
  [CHT_COLUMN]: crSplineConfig,
  [CHT_AREA_YEARLY]: crYearlyConfig
};

const RouterConfig = {
  getCrConfig: (seriaType) => _r[seriaType] || _r.DF
};

export default RouterConfig
