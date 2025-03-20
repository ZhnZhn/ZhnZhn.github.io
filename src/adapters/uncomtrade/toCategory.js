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

  const config = pipe(
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
  return config;
}

const URL_HS_CHAPTERS = './data/uncomtrade/hs-chapters.json';

let _hmHs;
const _fetchHs = () => _hmHs
 ? Promise.resolve(_hmHs)
 : fetch(URL_HS_CHAPTERS)
     .then(res => {
       if (!res.ok) {
         throw new Error("Network response was not OK")
       }
       return res.json();
     })
     .then(json => {
       return (_hmHs = (json || {}).hm);
     })
     .catch(() => void 0)

const _crCategoriesAndAddColors = (
  data,
  total
) => {
  sortDescCategory(data)
  addColorsTo({ data, total, propName: "y" })
  return data.map(p => p.c);
}

const _crHsData = (
  json,
  hmHs
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
  const categories = _crCategoriesAndAddColors(data, total)
  return [data, categories, total];
}

const _crAsyncData = (
  json
) => _fetchHs()
  .then(hmHs => _crHsData(json, hmHs));

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
  , categories = _crCategoriesAndAddColors(
      data,
      totalOfWorld
    );
  return _crConfig(
    json,
    option,
    data,
    categories,
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
