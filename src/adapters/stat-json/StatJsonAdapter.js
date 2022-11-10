import RouterConfig from './RouterConfig';
import fToCategorySeries from '../fToCategorySeries';

const _crConfig = (
  json,
  option
) => {
  const crConfig = RouterConfig
    .getCrConfig((option||{}).seriaType);
  return {
    config: crConfig(json, option)
  };
};

const StatJsonAdapter = {
  toConfig: _crConfig,
  toSeries: fToCategorySeries(_crConfig)
};

export default StatJsonAdapter
