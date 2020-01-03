
import AdapterFn from '../AdapterFn'

const {
  stockSeriesLegend,
  valueMoving
} = AdapterFn;

const _crZhConfig = (id, dataSource) => ({
  id: id,
  key: id,
  isWithoutAdd: true,
  legend: stockSeriesLegend(),
  dataSource: dataSource || "Alpha Vantage"
});

const fnAdapter = {
  crIntradayConfigOption: ({ id, data, dataSource }) => ({
    zhConfig: _crZhConfig(id, dataSource),
    valueMoving: valueMoving(data)
  })
}

export default fnAdapter
