import ConfigBuilder from '../../charts/ConfigBuilder';
import Yearly from '../toYearsByMonths';
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

const toYearly = {
  crConfig:(json, option) => {
    const { title='', subtitle } = option
    , [ ds, values, times ] = crDsValuesTimes(json, option)
    , data = _toData(values, times)
    , config = ConfigBuilder()
       .init(Yearly.toConfig(data, option))
       .add('chart', { spacingTop: 25 })
       .addCaption(title, subtitle)
       .add('info', crInfo(ds, option))
       .add('zhConfig', crZhConfig(option))
       .toConfig();

     return config;
  }
};

export default toYearly
