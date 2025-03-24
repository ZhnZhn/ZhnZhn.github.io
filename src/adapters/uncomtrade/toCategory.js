import { fGetLazyValue } from '../../utils/fGetLazyValue';
import pipe from '../../utils/pipe';

import {
  crBarOrColumnConfig,
  fAddCaption,
  fAdd,
  fAddSeriaBy,
  toConfig
} from '../../charts/configBuilderFn';
import { addColorsTo } from '../TreeMapFn';
import { sortDescCategory } from '../compareByFn';

import {
  isAggregateByHs,
  isPositiveNumber,
  getItemTradeValue,
  getItemCmdCode,
  crCategoryData,
  crCategoryTitle,
  addSumOfPercentToSubtitle,
  crInfo,
  crZhConfig
} from './fnAdapter';

const _crConfig = (
  json,
  option,
  data,
  categories,
  itemValue
) => {
  const title = crCategoryTitle(option);
  return pipe(
    crBarOrColumnConfig('BAR', categories),
    fAddCaption(
      title,
      option.subtitle
    ),
    fAdd({
      info: crInfo(json, option),
      zhConfig: crZhConfig(option, {
        itemValue,
        isWi: false
      })
    }),
    fAddSeriaBy(0, {
      data: data,
      name: title
    }),
    toConfig
  );
}

const URL_HS_CHAPTERS = './data/uncomtrade/hs-chapters.json';
const _crAsyncHmHs = () => fetch(URL_HS_CHAPTERS)
  .then(res => {
    if (!res.ok) {
      throw new Error("Network response was not OK")
    }
    return res.json();
  })
  .then(json => (json || {}).hm)
  .catch(() => void 0);

const _getHmHs = fGetLazyValue(_crAsyncHmHs, true);

const _addLevelColorsTo = (
  data,
  total,
  option
) => {
  sortDescCategory(data)
  addSumOfPercentToSubtitle(
    option,
    ...addColorsTo({
      data,
      total,
      propName: "y"
    })
  )
};

const _crCategoriesFrom = data => data.map(p => p.c)

const _crHsData = (
  hmHs,
  json,
  option
) => {
  const isHs = !!hmHs
  , data = []
  let total = 0;
  json.data.forEach(item => {
    const value = getItemTradeValue(item);
    if (isPositiveNumber(value)) {
      const cmdCode = getItemCmdCode(item)
      , descr = isHs && hmHs[cmdCode];
      total += value
      data.push({
        c: descr
            ? cmdCode + ' ' + descr
            : cmdCode,
        y: value
      })
    }
  })

  _addLevelColorsTo(
    data,
    total,
    option
  );

  return [
    data,
    _crCategoriesFrom(data),
    total
  ];
}

const _crAsyncData = (
  json,
  option
) => _getHmHs()
  .then(hmHs => _crHsData(hmHs, json, option));

const _crDataPoint = (
  y,
  c
) => ({ y, c });

const _toCategoryByCountry = (
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

  _addLevelColorsTo(
    data,
    totalOfWorld,
    option
  );

  return _crConfig(
    json,
    option,
    data,
    _crCategoriesFrom(data),
    totalOfWorld
  );
};

const toCategory = (
  json,
  option
) => isAggregateByHs(option)
  ? _crAsyncData(json)
      .then(([data, categories, total]) =>
        _crConfig(json, option, data, categories, total)
      )
  : _toCategoryByCountry(json, option);

export default toCategory
