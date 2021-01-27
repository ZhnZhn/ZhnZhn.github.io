
import AdapterFn from '../AdapterFn'
import crAdapterOHLCV from '../crAdapterOHLCV'

const {
  crItemConf,
  crValueConf
} = AdapterFn;

const _crZhConfig = (id, option, data) => {
  const { symbol, period, dataSource } = option;
  return {
    dataSource,
    id: id,
    key: id,
    linkFn: "NASDAQ",
    item: symbol,
    itemCaption: symbol,
    itemConf: {
      ...crItemConf(option),
      ...crValueConf(data),
      _itemKey: id,
      items: [{"v": symbol}, {"v": period}],
      dataSource
    }
  };
}

const _crInfo = (title) => ({
  name: title,
  frequency: "Daily",
});

const toChart = crAdapterOHLCV({  
  crAddConfig: ({ title, option, id, data }) => ({
    info: _crInfo(title),
    zhConfig: _crZhConfig(id, option, data)
  })
})

export default toChart
