
import toA from './toArea'
import toC from './toColumn'

const _r = {
  DF: toA.crConfig,
  AREA : toA.crConfig,
  COLUMN: toC.crConfig,
  BAR: toC.crConfig,
  COLUMN_CLUSTER: toC.fCrConfig({
    isCluster: true, seriaType: 'COLUMN'
  }),
  BAR_CLUSTER: toC.fCrConfig({
    isCluster: true, seriaType: 'BAR'
  })
}

const RouterConfig = {
  getCrConfig(seriaType) {
    return _r[seriaType] || _r.DF;
  }
}

export default RouterConfig
