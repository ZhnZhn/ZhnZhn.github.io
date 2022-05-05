import AdapterFn from '../AdapterFn'
import {
  crError,
  crItemConf,
  crValueConf
} from '../crFn';

const {
  ymdhmsToUTC
} = AdapterFn;

const _crZhConfig = (option, data) => {
  const {
    _itemKey,
    dataSource,
    itemCaption
  } = option;
  return {
    id: _itemKey, key: _itemKey,
    itemCaption,
    dataSource,
    itemConf: {
      _itemKey,
      ...crItemConf(option),
      ...crValueConf(data),
      dataSource
    }
  };
};

const fnAdapter = {
    crError: crError.bind(null, "Server Response"),

    crData: json => {
      const arr = json.metricData.series;
      return arr.map(({ time, values }) => [
        ymdhmsToUTC((time || '').replace('Z', ''), 'T'),
        parseFloat((values || [])[0])
      ]);
    },

    crConfOption: (option, json, data) => ({
      zhConfig: _crZhConfig(option, data)
    })
};

export default fnAdapter
