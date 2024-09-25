import JSONstat from 'jsonstat';

import {
  CHT_BAR,
  CHT_COLUMN,
  CHT_COLUMN_SET,
  CHT_BAR_SET,
  CHT_COLUMN_CLUSTER,
  CHT_BAR_CLUSTER
} from '../../constants/ChartType';

import { crCategoryPoint } from '../CategoryFn';
import crCategoryConfig from '../crCategoryConfig';

import {
  isYNumber,
  crTitle,
  crTid,
  crChartOption,
  toUpperCaseFirst
} from './fnAdapter';

const _assign = Object.assign
, _isArr = Array.isArray;

const _fCrCategoryPoint = (
  c
) => (v, i) => crCategoryPoint(
  v.value,
  c.Category(i).label
);

const _fIsCategoryPoint = (
  dfT
) => (p) => dfT && p.c === dfT
  ? false
  : isYNumber(p) && p.y !== 0;


const _compareByY = (a, b) => b.y - a.y;

const _crCategory = (option) => {
  const {
    items=[],
    dfC, dfT,
    dfC2, dfT2
  } = option
  , _dfC = dfC || dfC2
  , cTotal = dfT || dfT2
  , itemSlice = {};
  let i, _item;
  for(i=0; i<items.length; i++){
    _item = items[i]
    if (_item) {
      _assign(itemSlice, _item.slice)
    }
  }
  delete itemSlice[_dfC];
  return {
    category: _dfC,
    cTotal,
    itemSlice
  };
};

const _crData = (values, c, cTotal) => {
  const _hm = Object.create(null);
  return _isArr(values)
    ? values
        .map(_fCrCategoryPoint(c))
        .filter(_fIsCategoryPoint(cTotal))
        .sort(_compareByY)
        .reduce((data, p) => {
          const _c = p.c
          , _suffixIndex = _hm[_c];
          if (!_suffixIndex) {
            _hm[_c] = 2
          } else {
            const _c2 = `${_c} (${_suffixIndex})`;
            _hm[_c] += 1
            p.c = _c2
            p.name = _c2
          }
          data.push(p)
          return data;
        }, [])
    : [];
};

const _crValues = (_ds, _cSlice) => {
  const _v = _ds.Data(_cSlice);
  return _v !== null ? _v : [];
};

const _crSlice = (
  json,
  timeId,
  time,
  itemSlice,
  dfTSlice
) => ({
  [timeId]: time,
  ...itemSlice,
  ...dfTSlice
});

const _crTitle = (dfTitle, option) => dfTitle
  ? `${dfTitle}: All Items`
  : crTitle(option);

const _crSubtitle = (items, category) => {
  const _arr = [];
  items.forEach(item => {
    const { slice, caption } = item || {};
    if (slice && !slice[category] && caption) {
      _arr.push(toUpperCaseFirst(caption))
    }
  })
  return _arr.join(": ");
};

const _crConfig = (
  json,
  option
) => {
  const {
    category,
    cTotal,
    itemSlice,
    time,
    timeId='Tid',
    dfTitle,
    dfTSlice,
    seriaType,
    seriaColor,
    items=[],
  } = option
  , _ds = JSONstat(json).Dataset(0)
  , _dimC = _ds.Dimension(category)
  , Tid = crTid(time, _ds)
  , _cSlice = _crSlice(json, timeId, time, itemSlice, dfTSlice)
  , _values = _crValues(_ds, _cSlice)
  , _title = _crTitle(dfTitle, option)
  , _subtitle = _crSubtitle(items, category)
  , data = _crData(_values, _dimC, cTotal)
  , config = crCategoryConfig(
     _title,
     _subtitle,
     seriaType,
     seriaColor,
     data,
     option.isAlg
   );

  _assign(config, crChartOption(_ds, Tid, option))
  return config;
}
, _fCrConfig = (
  seriaType
) => (
  json,
  option
) => _crConfig(json, {
  ...option,
  seriaType,
  ..._crCategory(option)
});

const routerColumnBarSet = {
  [CHT_COLUMN_SET]: _fCrConfig(CHT_COLUMN),
  [CHT_COLUMN_CLUSTER]: _fCrConfig(CHT_COLUMN_CLUSTER),
  [CHT_BAR_SET]: _fCrConfig(CHT_BAR),
  [CHT_BAR_CLUSTER]: _fCrConfig(CHT_BAR_CLUSTER)
};

export default routerColumnBarSet
