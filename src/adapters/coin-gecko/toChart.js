import crConfigType1 from '../../charts/crConfigType1'
import AdapterFn from '../AdapterFn'

const { Builder } = crConfigType1
const { crItemLink } = AdapterFn;

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

const _crConfigOption = (option) => ({
    zhConfig: _crZhConfig(option),
    info: _crInfo(option)
  })

const toChart = {
  crKey(option){
    return option._itemKey;
  },

  toConfig(json, option){
    const {
      prices:data,
      total_volumes,
      market_caps
     } = json
     , { _currency } = option
     , confOption = _crConfigOption(option)
     , config = Builder(crConfigType1({
        option, data, confOption
      }))
      .addMiniVolume({
        btTitle: 'Volume',
        title: 'Volume ' + _currency,
        dVolume: total_volumes
      })
      .addMiniVolume({
        btTitle: 'Market Cap',
        title: 'Market Cap ' + _currency,
        dVolume: market_caps
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
