import {
  ymdhmsToUTC,
  crZhConfig
} from '../AdapterFn';
import {
  crError as _crError,
  crItemConf,
  crValueConf
} from '../crFn';

const _crZhConfig = (
  option,
  data
) => {
  const {
    _itemKey,
    dataSource
  } = option
  , _config = crZhConfig(option)
  _config.itemConf = {
    _itemKey,
    ...crItemConf(option),
    ...crValueConf(data),
    dataSource
  }
  return _config;
};


export const crError = _crError.bind(null, "Server Response")

export const crData = (
  json
) => json.metricData.series
  .map(({ time, values }) => [
     ymdhmsToUTC((time || '').replace('Z', ''), 'T'),
     parseFloat((values || [])[0])
  ]);

export const crConfOption = (
  option,
  json,
  data
) => ({
  zhConfig: _crZhConfig(option, data)
})
