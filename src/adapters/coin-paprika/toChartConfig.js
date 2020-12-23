import crAdapterType1 from '../crAdapterType1'
import fnAdapter from './fnAdapter'

const { crData, addConfOption } = fnAdapter;

const _crMvOption = (btTitle, dVolume, dColumn) => ({
  btTitle,
  title: `${btTitle} USD`,
  dVolume, dColumn
});

const addConfig = (builder, json, option, data) => {
  const {
    dVolume, dColumn,
    dMarketCap
  } = data;
  return builder
    .addMiniVolume(
      _crMvOption('Volume', dVolume, dColumn)
    )
    .addMiniVolume(
      _crMvOption('Market Cap', dMarketCap)
    );
};

const toChartConfig = crAdapterType1({
  crData, addConfOption, addConfig
});

export default toChartConfig
