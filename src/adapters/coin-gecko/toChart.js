import { fAddMiniVolumes } from '../../charts/stockBuilderFn';
import { crAdapterType1 } from '../crAdapterType1';
import { fCrItemLinkByCaption } from '../crFn';

const _crDescription = fCrItemLinkByCaption('Coin Gecko');
const _crInfo = ({ title, _nativeUrl }) => ({
  name: title,
  description: _crDescription(_nativeUrl)
});

const _crMvOption = (
  btTitle,
  currency,
  data
) => ({
  btTitle,
  title: `${btTitle} ${currency}`,
  data
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
