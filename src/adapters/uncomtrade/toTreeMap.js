import Builder from '../../charts/ConfigBuilder';
import {
  addColorsTo,
  crPointName
} from '../TreeMapFn';

import {
  isPositiveNumber,
  roundBy,
  getItemTradeValue,
  getItemCmdCode,
  getItemCmdDescE,
  getItemPeriod,
  crCategoryTitle,
  crInfo,
  crZhConfig
} from './fnAdapter';

const _compareByValue = (a, b) => b.value - a.value;

const _crTreeMapData = json => {
  const data = [];
  let total = 0;
  json.dataset.forEach(item => {
    const value = getItemTradeValue(item);
    if (isPositiveNumber(value)) {
      total += value
      data.push({
        value,
        label: getItemCmdCode(item),
        _d: getItemCmdDescE(item),
        title: getItemPeriod(item)
      })
    }
  })
  const _onePercent = total/100;
  data.forEach(item => {
    item.percent = roundBy(item.value/_onePercent)
    item.name = crPointName(
      item.label + ' ' + item._d,
      item.value,
      item.percent
    )
    item._d = void 0
  })
  data.sort(_compareByValue)
  addColorsTo({ data, total })
  return data;
}

const toTreeMap = (
  json,
  option
) => {
  const config = Builder()
    .treeMapConfig(_crTreeMapData(json))
    .addCaption(
       crCategoryTitle(option),
       option.subtitle
    )
    .add({
       info: crInfo(json, option),
       zhConfig: crZhConfig(option)
    })
    .toConfig();
  return config;
};

export default toTreeMap
