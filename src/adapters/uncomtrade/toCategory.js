import { isPositiveNumber } from '../../utils/isTypeFn';
import { fetchJsonHm } from '../../utils/fnFetch';
import { fGetLazyValue } from '../../utils/fGetLazyValue';
import pipe from '../../utils/pipe';

import {
  crBarOrColumnConfig,
  fAddCaption,
  fAdd,
  fAddSeriaBy,
  toConfig
} from '../../charts/configBuilderFn';

import { crCategories } from '../CategoryFn';
import { addColorsTo } from '../TreeMapFn';
import { sortDescCategory } from '../compareByFn';

import {
  isAggregateByHs,
  getItemTradeValue,
  getItemCmdCode,
  crCategoryData,
  crCategoryTitle,
  addSumOfPercentToSubtitle,
  crInfo,
  crZhConfig
} from './fnAdapter';

const _crCategoryConfig = (
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
const _crAsyncHmHs = () => fetchJsonHm(URL_HS_CHAPTERS)
, _getAsyncHmHs = fGetLazyValue(_crAsyncHmHs, true);

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
    crCategories(data),
    total
  ];
}

const _toCategoryByHs = (
  json,
  option
) => _getAsyncHmHs()
  .then(hmHs => _crHsData(hmHs, json, option))
  .then(dataConfigTuple => _crCategoryConfig(
    json,
    option,
    ...dataConfigTuple
  ));

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

  return _crCategoryConfig(
    json,
    option,
    data,
    crCategories(data),
    totalOfWorld
  );
};

const toCategory = (
  json,
  option
) => (isAggregateByHs(option)
  ? _toCategoryByHs
  : _toCategoryByCountry)(json, option);

export default toCategory
