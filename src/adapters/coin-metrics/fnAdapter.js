import AdapterFn from '../AdapterFn'

const {
  crError,
  ymdhmsToUTC
} = AdapterFn;

const _crZhConfig = (option) => {
  const {
    dataSource, _itemKey,
    title
  } = option
  , _id = _itemKey;
  return {
    id: _id, key: _id,
    itemCaption: title,
    dataSource,
    itemConf: {
       _itemKey: _id,
       dataSource,
    }
  }
};

const fnAdapter = {
    crError: crError.bind(null, "Server Response"),

    crData: (json) => {
      const arr = json.metricData.series
      , data = arr.map(item => [
          ymdhmsToUTC(item.time.replace('T', ' ').replace('Z', '')),
          parseFloat(item.values[0])
      ]);
      return data;
    },

    crTitle: ({ title, subtitle }) => ({
      title,
      subtitle
    }),

    crConfigOption: (json, option) => ({
      zhConfig: _crZhConfig(option)
    })
};

export default fnAdapter
