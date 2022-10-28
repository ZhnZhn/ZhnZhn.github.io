export {
  getDaysFromYmd,
  crError
} from '../AdapterFn';

import {
  ymdhmsToUTC,
  crZhConfig
} from '../AdapterFn';
import {
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


export const crData = (
  json,
  { metric }
) => json.data
  .map((item={}) => [
     ymdhmsToUTC((item.time || '').replace('Z', ''), 'T'),
     parseFloat(item[metric])
  ]);

export const crConfOption = (
  option,
  json,
  data
) => ({
  zhConfig: _crZhConfig(option, data)
})
