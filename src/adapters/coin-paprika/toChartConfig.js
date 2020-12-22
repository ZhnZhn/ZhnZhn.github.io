import crAdapterType1 from '../crAdapterType1'
import fnAdapter from './fnAdapter'

const { Builder } = crAdapterType1
, { crData, addConfOption } = fnAdapter;

const _crMvOption = (btTitle, dVolume, dColumn) => ({
  btTitle,
  title: `${btTitle} USD`,
  dVolume, dColumn
});

const addConfig = (config, json, option, data) => {
  const {
    dVolume, dColumn,
    dMarketCap
  } = data;
  return Builder(config)
    .addMiniVolume(
      _crMvOption('Volume', dVolume, dColumn)
    )
    .addMiniVolume(
      _crMvOption('Market Cap', dMarketCap)
    )
    .toConfig();
};

const toChartConfig = crAdapterType1({
  crData, addConfOption, addConfig
});

export default toChartConfig
