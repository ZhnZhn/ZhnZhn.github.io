import {
  isAggrByTotalWorld,
  isAggr,
  isCategorySet
} from './fnAdapter';

import toTreeMap from './toTreeMap';
import toCategory from './toCategory';
import toSeriesConfig from './toSeriesConfig';
import toCategorySet from './toCategorySet';

const _fToConfig = (
  toConfig
) => (json, option) => ({
  config: toConfig(json, option)
});

const toConfig = (
  option
) => {
  if (isCategorySet(option)) {
    option.seriaType = option.chType.value
    return toCategorySet;
  }
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
