import toTreeMap from './toTreeMap';
import toSeriesConfig from './toSeriesConfig';

const toConfig = (
  json,
  option
) => {
  if (option.two === 'AG2') {
    return toTreeMap(json, option);
  }
  return toSeriesConfig(json, option);
}

export default toConfig
