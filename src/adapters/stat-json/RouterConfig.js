import routerColumnBarSet from './toColumn';
import routerTreeMap from './toTreeMap';
import routerSplineConfig from './toSpline';

const _r = {
  ...routerColumnBarSet,
  ...routerTreeMap,
  ...routerSplineConfig
};

const RouterConfig = {
  getCrConfig: (seriaType) => _r[seriaType] || _r.DF
};

export default RouterConfig
