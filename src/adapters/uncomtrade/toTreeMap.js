import pipe from '../../utils/pipe';
import {
  crTreeMapConfig,
  fAddCaption,
  fAdd,
  toConfig
} from '../../charts/configBuilderFn';
import {
  addPercentAndColorToData
} from '../TreeMapFn';

import {
  isAggregateByHs,
  isPositiveNumber,
  getItemTradeValue,
  getItemCmdCode,
  getItemCmdDescE,
  getItemPeriod,
  crCategoryData,
  crCategoryTitle,
  addSumOfPercentToSubtitle,
  crInfo,
  crZhConfig
} from './fnAdapter';

const _addColorAndPercentLevelsTo = (
  data,
  total,
  option
) => addSumOfPercentToSubtitle(
  option,
  ...addPercentAndColorToData(data, total)
);

const _crTreeMapData = (
  json,
  option
) => {
  const data = [];
  let total = 0;
  json.data.forEach(item => {
    const value = getItemTradeValue(item);
    if (isPositiveNumber(value)) {
      total += value
      data.push({
        value,
        label: getItemCmdCode(item) + ' ' + getItemCmdDescE(item),
        title: getItemPeriod(item)
      })
    }
  })

  _addColorAndPercentLevelsTo(
    data,
    total,
    option
  )
  return [data, total];
}

const _crDataPoint = (
  value,
  label,
  item
) => ({
  value,
  label,
  title: getItemPeriod(item)
})

const _crDataByCountry = (
  json,
  option
) => {
  const [
    data,
    totalOfWorld
  ] = crCategoryData(
    json,
    option,
    _crDataPoint
  );

  _addColorAndPercentLevelsTo(
    data,
    totalOfWorld,
    option
  );

  return [
    data,
    totalOfWorld
  ];
};

const toTreeMap = (
  json,
  option
) => {
  const [
    data,
    itemValue
  ] = isAggregateByHs(option)
    ? _crTreeMapData(json, option)
    : _crDataByCountry(json, option);

  return pipe(
    crTreeMapConfig(data),
    fAddCaption(
      crCategoryTitle(option),
      option.subtitle
    ),
    fAdd({
      info: crInfo(json, option),
      zhConfig: crZhConfig(option, { itemValue })
    }),
    toConfig
  );
};

export default toTreeMap
