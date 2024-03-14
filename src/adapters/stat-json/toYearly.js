import pipe from '../../utils/pipe';
import {
  fAddCaption,
  fAdd,
  toConfig
} from '../../charts/configBuilderFn';
import crYearlyConfigImpl from '../toYearsByMonths';

import {
  crDsValuesTimes,
  crInfo,
  crZhConfig,
} from './fnAdapter';
import { toYMD } from './fnUtil';

const _isArr = Array.isArray;

const _toData = (
  values,
  times
) => {
  const _values = _isArr(values)
    ? values
    : [values];
  const data = times.map((time, i) => ([
    toYMD(time),
    _values[i].value
  ]))

  return data.reverse();
};

const crYearlyConfig = (
  json,
  option
) => {
  const {
    title='',
    subtitle
  } = option
  , [
    ds,
    values,
    times
  ] = crDsValuesTimes(json, option)
  , data = _toData(values, times);

   return pipe(
     crYearlyConfigImpl(data, option),
     fAdd('chart', { spacingTop: 25 }),
     fAddCaption(title, subtitle),
     fAdd('info', crInfo(ds, option)),
     fAdd('zhConfig', crZhConfig(option)),
     toConfig
   );
};

export default crYearlyConfig
