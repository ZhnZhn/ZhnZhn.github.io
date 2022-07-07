import Builder from '../../charts/ConfigBuilder';
import { tooltipCategory } from '../../charts/Tooltip';
import {
  addColorsTo
} from '../TreeMapFn';

import {
  isPositiveNumber,
  getItemTradeValue,
  getItemCmdCode,
  getItemCmdDescE,
  crCategoryTitle,
  crInfo,
  crZhConfig
} from './fnAdapter';

const _compareByY = (a, b) => b.y - a.y;

const _crData = (
  json
) => {
  const data = []
  let total = 0;
  json.dataset.forEach(item => {
    const value = getItemTradeValue(item);
    if (isPositiveNumber(value)) {
      const cmdCode = getItemCmdCode(item)
      , cmdDescE = getItemCmdDescE(item);
      total += value
      data.push({
        id: cmdCode,
        c: cmdCode + ' ' + cmdDescE,      
        y: value
      })
    }
  })
  data.sort(_compareByY)
  const categories = data.map(p => p.c)
  addColorsTo({ data, total, propName: "y" })
  return [data, categories];
}

const toCategory = (
  json,
  option
) => {
  const [data, categories] = _crData(json)
  , title = crCategoryTitle(option)
  , config = Builder()
      .barOrColumnConfig('BAR', categories)
      .addCaption(
         title,
         option.subtitle
      )
      .addTooltip(tooltipCategory)
      .add({
         chart: { spacingTop: 25 },
         info: crInfo(json, option),
         zhConfig: crZhConfig(option)
      })
      .toConfig();

  config.series[0].data = data
  config.series[0].name = title
  config.zhConfig.isWithoutIndicator = false

  return config;
}

export default toCategory
