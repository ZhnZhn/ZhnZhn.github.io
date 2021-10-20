import toSpline from './toSpline';
import toY from './toYearly';
import toC from './toColumn';
import toT from './toTreeMap';

const _r = {
  DF: toSpline.crConfig,
  AREA: toSpline.crConfig,
  SPLINE: toSpline.crConfig,
  COLUMN: toSpline.crConfig,
  AREA_YEARLY: toY.crConfig,
  COLUMN_SET: toC.fCrConfig({ seriaType: 'COLUMN'}),
  BAR_SET: toC.fCrConfig({ seriaType: 'BAR'}),
  COLUMN_CLUSTER: toC.fCrConfig({
    isCluster: true, seriaType: 'COLUMN'
  }),
  BAR_CLUSTER: toC.fCrConfig({
    isCluster: true, seriaType: 'BAR'
  }),  
  TREE_MAP: toT.fCrConfig(),
  TREE_MAP_CLUSTER: toT.fCrConfig(
    { isCluster: true }
  ),
  TREE_MAP_2: toT.fCrConfig(
    {}, { depth: "d2" }
  ),
  TREE_MAP_2_CLUSTER: toT.fCrConfig(
    { isCluster: true }, { depth: "d2" }
  )
};

const RouterConfig = {
  getCrConfig: (seriaType) => _r[seriaType] || _r.DF
};

export default RouterConfig
