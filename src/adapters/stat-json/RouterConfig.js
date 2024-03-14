import {
  CHT_AREA,
  CHT_SPLINE,
  CHT_COLUMN,
  CHT_AREA_YEARLY,

  CHT_TREE_MAP,
  CHT_TREE_MAP_CLUSTER,
  CHT_TREE_MAP_2,
  CHT_TREE_MAP_2_CLUSTER
} from '../../constants/ChartType';

import crSplineConfig from './toSpline';
import toY from './toYearly';
import routerColumnBarSet from './toColumn';
import toT from './toTreeMap';

const _r = {
  ...routerColumnBarSet,

  DF: crSplineConfig,
  [CHT_AREA]: crSplineConfig,
  [CHT_SPLINE]: crSplineConfig,
  [CHT_COLUMN]: crSplineConfig,

  [CHT_AREA_YEARLY]: toY.crConfig,

  [CHT_TREE_MAP]: toT.fCrConfig(),
  [CHT_TREE_MAP_CLUSTER]: toT.fCrConfig(
    { isCluster: true }
  ),
  [CHT_TREE_MAP_2]: toT.fCrConfig(
    {}, { depth: "d2" }
  ),
  [CHT_TREE_MAP_2_CLUSTER]: toT.fCrConfig(
    { isCluster: true }, { depth: "d2" }
  )
};

const RouterConfig = {
  getCrConfig: (seriaType) => _r[seriaType] || _r.DF
};

export default RouterConfig
