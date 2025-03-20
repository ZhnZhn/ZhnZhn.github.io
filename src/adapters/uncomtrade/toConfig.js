import {
  isTreeMap,
  isDotSet
} from '../CategoryFn';

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
) => ({
  toConfig: _fToConfig(
    isTreeMap(option)
      ? toTreeMap
      : isDotSet(option)
      ? toSeriesConfig
      : toCategory
  )
});

export default toConfig
