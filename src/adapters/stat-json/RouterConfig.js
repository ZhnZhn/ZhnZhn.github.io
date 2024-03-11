import {
  CHT_AREA,
  CHT_SPLINE,
  CHT_BAR,
  CHT_COLUMN,
  CHT_AREA_YEARLY,
  CHT_COLUMN_SET,
  CHT_BAR_SET,
  CHT_COLUMN_CLUSTER,
  CHT_BAR_CLUSTER,
  CHT_TREE_MAP,
  CHT_TREE_MAP_CLUSTER,
  CHT_TREE_MAP_2,
  CHT_TREE_MAP_2_CLUSTER
} from '../../constants/ChartType';

import toSpline from './toSpline';
import toY from './toYearly';
import toC from './toColumn';
import toT from './toTreeMap';

const _r = {
  DF: toSpline.crConfig,
  [CHT_AREA]: toSpline.crConfig,
  [CHT_SPLINE]: toSpline.crConfig,
  [CHT_COLUMN]: toSpline.crConfig,
  [CHT_AREA_YEARLY]: toY.crConfig,
  [CHT_COLUMN_SET]: toC.fCrConfig({ seriaType: CHT_COLUMN }),
  [CHT_BAR_SET]: toC.fCrConfig({ seriaType: CHT_BAR }),
  [CHT_COLUMN_CLUSTER]: toC.fCrConfig({
    isCluster: true, seriaType: CHT_COLUMN
  }),
  [CHT_BAR_CLUSTER]: toC.fCrConfig({
    isCluster: true, seriaType: CHT_BAR
  }),
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
