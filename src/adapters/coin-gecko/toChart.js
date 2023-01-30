import { fAddMiniVolumes } from '../../charts/stockBuilderFn';
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
, addToConfig = (config, json, option) => {
   const {
     total_volumes,
     market_caps
   } = json
   , { _currency } = option;

   return fAddMiniVolumes([
     _crMvOption('Volume', _currency, total_volumes),
     _crMvOption('Market Cap', _currency, market_caps)
   ])(config);
};

const toChart = crAdapterType1({
  crData,
  addConfOption,
  addToConfig
});

export default toChart
