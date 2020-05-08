
import AdapterFn from '../AdapterFn'

const {
  crItemConf,
  crValueConf,
  stockSeriesLegend,
  valueMoving
} = AdapterFn;

const _crItemConf = ({id, dataSource, data}, option) => {
  const { indicator, ticket, dfT, interval } = option;
  return indicator === 'TIME_SERIES_DAILY'
     ? {
          _itemKey: id,
          ...crItemConf(option),
          ...crValueConf(data),
          dfT, interval, indicator, ticket,
          dataSource
       }
    : void 0;
};

const _crZhConfig = (config, option) => {
  const { id, dataSource } = config
  , itemConf = _crItemConf(config, option);
  return {
    id, key: id,
    itemConf,
    legend: stockSeriesLegend(),
    dataSource: dataSource || "Alpha Vantage"
  }
};

const fnAdapter = {
  crIntradayConfigOption: (config, option) => ({
    zhConfig: _crZhConfig(config, option),
    valueMoving: valueMoving(config.data)
  })
}

export default fnAdapter
