
import AdapterFn from '../AdapterFn'
import crAdapterOHLCV from '../crAdapterOHLCV'

const {
  crItemConf,
  crValueConf
} = AdapterFn;

const _crZhConfig = (id, option, data) => {
  const { one, two, dataSource } = option;
  return {
    dataSource,
    id: id,
    key: id,
    linkFn: "NASDAQ",
    item: one,
    itemCaption: one,
    itemConf: {
      ...crItemConf(option),
      ...crValueConf(data),
      _itemKey: id,
      symbol: one,
      dfPeriod: two,
      dataSource
    }
  };
}

const _crInfo = (title) => ({
  name: title,
  frequency: "Daily",
});

const toChart = crAdapterOHLCV({
  crId: ({ _itemKey, one, two }) => _itemKey
    || one + '_' + two,
  crAddConfig: ({ title, option, id, data }) => ({
    info: _crInfo(title),
    zhConfig: _crZhConfig(id, option, data)
  })
})

export default toChart
