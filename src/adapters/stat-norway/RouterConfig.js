
import toA from './toArea'
import toC from './toColumn'
import toT from './toTreeMap'

const _r = {
  DF: toA.crConfig,
  AREA : toA.crConfig,
  COLUMN: toC.fCrConfig(),
  BAR: toC.fCrConfig(),
  COLUMN_CLUSTER: toC.fCrConfig({
    isCluster: true, seriaType: 'COLUMN'
  }),
  BAR_CLUSTER: toC.fCrConfig({
    isCluster: true, seriaType: 'BAR'
  }),
  COLUMN_BY_2: toC.fCrConfig(
    { seriaType: 'COLUMN' }, { by: '2' }
  ),
  BAR_BY_2: toC.fCrConfig(
    { seriaType: 'BAR' }, { by: '2' }
  ),
  TREE_MAP: toT.fCrConfig(),
  TREE_MAP_CLUSTER: toT.fCrConfig(
    { isCluster: true }
  ),
  TREE_MAP_2: toT.fCrConfig(
    {}, { depth: "d2" }
  ),
  TREE_MAP_2_CLUSTER: toT.fCrConfig(
    { isCluster: true }, { depth: "d2" }
  ),
}

const RouterConfig = {
  getCrConfig(seriaType) {    
    return _r[seriaType] || _r.DF;
  }
}

export default RouterConfig
