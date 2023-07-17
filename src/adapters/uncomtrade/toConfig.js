import {
  isAggrByTotalWorld,
  isAggr
} from './fnAdapter';

import toTreeMap from './toTreeMap';
import toCategory from './toCategory';
import toSeriesConfig from './toSeriesConfig';

const _fToConfig = (
  toConfig
) => (json, option) => ({
  config: toConfig(json, option)
});

const toConfig = (
  option
) => {
  const toConfig = isAggr(option.two) || isAggrByTotalWorld(option)
    ? option.chart === 'BAR'
        ? toCategory
        : toTreeMap
    : toSeriesConfig;
  return {
    toConfig: _fToConfig(toConfig)
  };
}

export default toConfig
