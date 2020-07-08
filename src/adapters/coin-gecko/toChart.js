import Builder from '../../charts/ConfigBuilder';

import AdapterFn from '../AdapterFn'

const {
  valueMoving,
  crItemLink  
} = AdapterFn;

const _crZhConfig = ({
    _itemKey,
    itemCaption,
    dataSource
  }) => ({
    id: _itemKey, key: _itemKey,
    itemCaption,
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

const toChart = {
  crKey(option){
    return option._itemKey;
  },

  toConfig(json, option){
    const data = json.prices
     , {
         seriaType, seriaColor, seriaWidth,
         title, subtitle, _currency
       } = option
     , seria = Builder()
        .splineSeria({
          seriaType, seriaColor, seriaWidth,
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
    return Builder.crSeria({
      adapter: toChart,
      json, option
    });
  }
}

export default toChart
