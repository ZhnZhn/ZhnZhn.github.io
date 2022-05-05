import crAdapterType1 from '../crAdapterType1';
import { crItemLink } from './fnAdapter';

const _crDescription = crItemLink
  .bind(null, 'Coin Gecko');

const _crInfo = ({ title, _nativeUrl }) => ({
  name: title,
  description: _crDescription(_nativeUrl)
});

const _crMvOption = (
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
, addConfig = (builder, json, option) => {
   const {
     total_volumes,
     market_caps
   } = json
   , { _currency } = option;
   return builder
    .addMiniVolume(_crMvOption(
      'Volume', _currency, total_volumes
    ))
    .addMiniVolume(_crMvOption(
      'Market Cap', _currency, market_caps
    ));
};

const toChart = crAdapterType1({
  crData,
  addConfOption,
  addConfig
});

export default toChart
