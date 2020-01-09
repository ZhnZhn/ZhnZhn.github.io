import Builder from '../../charts/ConfigBuilder'

import AdapterFn from '../AdapterFn'
import IntradayFns from '../IntradayFns'

const {
  stockSeriesLegend,
  valueMoving
} = AdapterFn;

const {
  crSeriesData,
  crDataVm
} = IntradayFns;

const _crZhConfig = (id, dataSource) => ({
  id: id,
  key: id,
  isWithoutAdd: true,
  legend: stockSeriesLegend(),
  dataSource: dataSource
});

const _crIntradayConfigOption = ({ id, data, dataSource }) => ({
  zhConfig: _crZhConfig(id, dataSource),
  valueMoving: valueMoving(data)
});

const WtdIntraday = {
  crKey(option){
    const { value, two } = option;
    return `${value} (${two}min)`;
  },
  toConfig(json, option) {
    const { _itemId, dataSource } = option
    , {
        data, dH, dL, dO,
        minClose, maxClose,
        dColumn, dVolume
      } = crSeriesData(json.intraday, option, _itemId)
    , _dataVm = crDataVm(data)
    //, { timezone_name='' } = json
    , config = Builder()
        .intradayConfig({
           id: _itemId,
           data, dH, dL, dO,
           minClose, maxClose,
           dVolume, dColumn
         })
        .addCaption(_itemId)
        .add(_crIntradayConfigOption({
           id: _itemId,
           data: _dataVm,
           dataSource
        }))
        .toConfig();

    return { config };
  }
};

export default WtdIntraday
