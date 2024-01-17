import { fAddMiniVolumes } from '../../charts/stockBuilderFn';
import crAdapterType1 from '../crAdapterType1';
import { crData, addConfOption } from './fnAdapter';

const _crMvOption = (
  btTitle,
  data,
  dColumn
) => ({
  btTitle,
  title: `${btTitle} USD`,
  data, 
  dColumn
});

const addToConfig = (
  config,
  json,
  option,
  data
) => {
  const {
    dVolume,
    dColumn,
    dMarketCap
  } = data;
  return fAddMiniVolumes([
    _crMvOption('Volume', dVolume, dColumn),
    _crMvOption('Market Cap', dMarketCap)
  ])(config);
};

const toChartConfig = crAdapterType1({
  crData,
  addConfOption,
  addToConfig
});

export default toChartConfig
