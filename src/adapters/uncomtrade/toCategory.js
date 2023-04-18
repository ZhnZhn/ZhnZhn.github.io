import pipe from '../../utils/pipe';
import {
  crBarOrColumnConfig,
  fAddCaption,
  fAdd,
  fAddSeriaBy,
  toConfig
} from '../../charts/configBuilderFn';
import { addColorsTo } from '../TreeMapFn';

import {
  isTotalByAll,
  isPositiveNumber,
  isNotNested,
  getItemTradeValue,
  getItemCmdCode,
  getItemPtTitle,
  getHmTradePartners,
  crCategoryTitle,
  crInfo,
  crZhConfig
} from './fnAdapter';
import {
  WORLD_CODE
} from './conf';

const _crConfig = (
  json,
  option,
  data,
  categories
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
      zhConfig: crZhConfig(option, { isWi: false })
    }),
    fAddSeriaBy(0, {
      data: data,
      name: title
    }),
    toConfig
  );
  console.log(config)
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

const _compareByY = (a, b) => b.y - a.y;

const _crCategoriesAndAddColors = (
  data,
  total
) => {
  data.sort(_compareByY)
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
  json.dataset.forEach(item => {
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
  return [data, categories];
}

const _crAsyncData = (
  json
) => _fetchHs()
  .then(hmHs => _crHsData(json, hmHs));

const _toCategoryByCountry = (
  json,
  option
) => {
  const data = [];
  let totalWorld = 0
  , total = 0
  , _hm = getHmTradePartners(option.tradePartners);
  json.dataset.forEach(item => {
    const value = getItemTradeValue(item)
    , ptTitle = getItemPtTitle(item);
    if (ptTitle === WORLD_CODE) {
      totalWorld = value
    } else if (isNotNested(ptTitle) && isPositiveNumber(value)) {
      total += value
      data.push({
        c: _hm[ptTitle] || ptTitle,
        y: value
      })
    }
  })
  const categories = _crCategoriesAndAddColors(data, totalWorld || total);
  return _crConfig(
    json,
    option,
    data,
    categories
  );
}

const toCategory = (
  json,
  option
) => isTotalByAll(option)
 ? _toCategoryByCountry(json, option)
 : _crAsyncData(json)
     .then(([data, categories]) =>
       _crConfig(json, option, data, categories)
      );

export default toCategory
