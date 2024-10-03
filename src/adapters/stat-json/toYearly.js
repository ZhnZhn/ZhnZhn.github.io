import pipe from '../../utils/pipe';
import {
  fAddCaption,
  fAdd,
  toConfig
} from '../../charts/configBuilderFn';
import { crYearlyData } from '../JsonStatFn';
import crYearlyConfigImpl from '../toYearsByMonths';

import {
  crInfo,
  crZhConfig
} from './fnAdapter';

const crYearlyConfig = (
  json,
  option
) => {
  const {
    title='',
    subtitle
  } = option
  , data = crYearlyData(json).reverse();
  return pipe(
    crYearlyConfigImpl(data, option),
    fAdd('chart', { spacingTop: 25 }),
    fAddCaption(title, subtitle),
    fAdd('info', crInfo(option, json)),
    fAdd('zhConfig', crZhConfig(option)),
    toConfig
  );
};

export default crYearlyConfig
