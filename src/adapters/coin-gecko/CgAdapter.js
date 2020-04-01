import Builder from '../../charts/ConfigBuilder';

import AdapterFn from '../AdapterFn'

const {
  valueMoving,
  crItemLink
} = AdapterFn;

const _crSeriaType = seriaType => typeof seriaType === 'string'
  ? seriaType.toLowerCase()
  : 'spline'

  const _crZhConfig = ({
    _itemKey,
    itemCaption,
    dataSource
  }) => ({
    id: _itemKey, key: _itemKey,
    itemCaption,
    isWithoutAdd: true,
    dataSource
  });

const _crDescription = crItemLink
  .bind(null, 'Coin Gecko');

const _crInfo = ({ title, _nativeUrl}) => ({
  name: title,
  description: _crDescription(_nativeUrl)
});

const _crConfigOption = ({ json, option, data }) => ({
    zhConfig: _crZhConfig(option),
    valueMoving: valueMoving(data),
    info: _crInfo(option)
  })

const CgAdapter = {
  toConfig(json, option){
    const data = json.prices
     , {
         seriaType, seriaColor,
         title, subtitle, _currency
       } = option
     , seria = Builder()
        .splineSeria({
          type: _crSeriaType(seriaType),
          color: seriaColor,
          data
        })
        .toSeria()
    , config = Builder()
        .area2Config(title, subtitle)
        .addSeries(seria)
        .addMinMax(data, option)
        .add({
          ..._crConfigOption({ json, option, data })
        })
        .addMiniVolume({
          btTitle: 'Volume',
          title: 'Volume ' + _currency,
          dVolume: json.total_volumes
        })
        .addMiniVolume({
          btTitle: 'Market Cap',
          title: 'Market Cap ' + _currency,
          dVolume: json.market_caps
        })
        .toConfig();
    return { config };
  },
  
  toSeries(json, option){
    const { config } = CgAdapter.toConfig(json, option);
    return config.series[0];
  }
}

export default CgAdapter
