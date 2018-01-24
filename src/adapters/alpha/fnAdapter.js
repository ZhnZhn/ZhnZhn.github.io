
import AdapterFn from '../AdapterFn'

const {
        stockSeriesLegend,
        valueMoving, crZhFn
      } = AdapterFn;

const _crZhConfig = id => ({
  id: id,
  key: id,
  isWithLegend: true,
  legend: stockSeriesLegend(),
  dataSource: "Alpha Vantage"
});

const fnAdapter = {
  crIntradayConfigOption: ({ id, data }) => ({
    zhConfig: _crZhConfig(id),
    valueMoving: valueMoving(data),
    ...crZhFn()
  })
}

export default fnAdapter
