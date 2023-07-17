import pipe from '../../utils/pipe';
import {
  crTreeMapConfig,
  fAddCaption,
  fAdd,
  toConfig
} from '../../charts/configBuilderFn';
import {
  addColorsTo,
  crPointName
} from '../TreeMapFn';
import {
  compareByValue,
  sortDescBy
} from '../compareByFn';

import {
  isPositiveNumber,
  isTotalByAll,
  roundBy,
  getItemTradeValue,
  getItemCmdCode,
  getItemCmdDescE,
  getItemPeriod,
  crCategoryData,
  crCategoryTitle,
  crInfo,
  crZhConfig
} from './fnAdapter';

const _addPercentAndColorToData = (
  data,
  total
) => {
  if (total !== 0) {
    const _onePercent = total/100;
    data.forEach(item => {
      item.percent = roundBy(item.value/_onePercent)
      item.name = crPointName(
        item.label,
        item.percent > 1 ? item.percent : ''
      )
    })
    sortDescBy(compareByValue, data)  
    addColorsTo({ data, total })
  } else {
    data = []
  }
};

const _crTreeMapData = json => {
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
  _addPercentAndColorToData(data, total)
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
  )
  _addPercentAndColorToData(data, totalOfWorld)
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
  ] = isTotalByAll(option)
    ? _crDataByCountry(json, option)
    : _crTreeMapData(json);
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
