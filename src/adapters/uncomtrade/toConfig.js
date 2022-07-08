import { isTotalByAll } from './fnAdapter';

import toTreeMap from './toTreeMap';
import toCategory from './toCategory';
import toSeriesConfig from './toSeriesConfig';

const toConfig = (
  json,
  option
) => {
  if (option.two === 'AG2' || isTotalByAll(option)) {
    return option.chart === 'BAR'
      ? toCategory(json, option)
      : toTreeMap(json, option);
  }
  return toSeriesConfig(json, option);
}

export default toConfig
