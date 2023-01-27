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
  isPositiveNumber,
  isTotalByAll,
  isNotNested,
  roundBy,
  getItemTradeValue,
  getItemCmdCode,
  getItemCmdDescE,
  getItemPtTitle,
  getItemPeriod,
  crCategoryTitle,
  crInfo,
  crZhConfig
} from './fnAdapter';

const _compareByValue = (a, b) => b.value - a.value;

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
    data.sort(_compareByValue)
    addColorsTo({ data, total })
  } else {
    data = []
  }
};

const _crTreeMapData = json => {
  const data = [];
  let total = 0;
  json.dataset.forEach(item => {
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
  return data;
}

const _crDataByCountry = (
  json
) => {
  const data = [];
  let totalWorld = 0
  , total = 0;
  json.dataset.forEach(item => {
    const value = item.TradeValue
    , ptTitle = getItemPtTitle(item);
    if (ptTitle === "World") {
      totalWorld = value
    } else if (isNotNested(ptTitle) && isPositiveNumber(value)) {
      total += value
      data.push({
        value,
        label: ptTitle,
        title: getItemPeriod(item)
      })
    }
  })
  _addPercentAndColorToData(data, totalWorld || total)
  return data;
}

const toTreeMap = (
  json,
  option
) => {
  const data = isTotalByAll(option)
    ? _crDataByCountry(json)
    : _crTreeMapData(json);

  return pipe(
    crTreeMapConfig(data),
    fAddCaption(
      crCategoryTitle(option),
      option.subtitle
    ),
    fAdd({
      info: crInfo(json, option),
      zhConfig: crZhConfig(option)
    }),
    toConfig
  );
};

export default toTreeMap
