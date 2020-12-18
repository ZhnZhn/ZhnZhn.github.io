import crAdapterType1 from '../crAdapterType1'
import AdapterFn from '../AdapterFn'

const { Builder } = crAdapterType1
, { crItemLink } = AdapterFn;

const _crDescription = crItemLink
  .bind(null, 'Coin Gecko');

const _crInfo = ({ title, _nativeUrl }) => ({
  name: title,
  description: _crDescription(_nativeUrl)
});

const _crVolumeConfig = (
  btTitle,
  currency,
  dVolume
) => ({
  btTitle,
  title: `${btTitle} ${currency}`,
  dVolume
});

const crData = ({ prices }) => prices
, addConfOption = (option) => ({
   info: _crInfo(option)
})
, addConfig = (config, json, option) => {
   const {
     total_volumes,
     market_caps
   } = json
   , { _currency } = option;
   return Builder(config)
    .addMiniVolume(_crVolumeConfig(
      'Volume', _currency, total_volumes
    ))
    .addMiniVolume(_crVolumeConfig(
      'Market Cap', _currency, market_caps
    ))
    .toConfig();
};

const toChart = crAdapterType1({
  crData,
  addConfOption,
  addConfig
});

export default toChart
