import JSONstat from 'jsonstat';
import clusterMaker from '../../math/k-means';

import Builder from '../../charts/ConfigBuilder';
import Tooltip from '../../charts/Tooltip';

import fnAdapter from './fnAdapter';

const {
  isYNumber,
  crTitle,
  crTid,
  crChartOption
} = fnAdapter;

const _assign = Object.assign
, _isArr = Array.isArray;

const COLORS = [
  '#9ecae1', '#6baed6',
  '#4292c6', '#2171b5',
  '#08519c', '#08306b',
  '#74c476'
];

const _fCrCategoryPoint = (c) => (v, i) => {
  const label = c.Category(i).label;
  return {
    y: v.value,
    name: label,
    c: label
  };
};
const _fIsCategoryPoint = (dfT) => (p) => {
  if (dfT && p.c === dfT) {
    return false;
  }
  return isYNumber(p) && p.y !== 0;
};
const _compareByY = (a, b) => a.y - b.y;

const _colorItems = (data, _clusters) => {
  _clusters.forEach((cluster, colorIndex) => {
      cluster.points.forEach(p => {
        data[p.id].color = COLORS[colorIndex]
      })
  })
};

const _setClusters = (data) => {
  if (data.length !== 0) {
    const _points = data.map((item, index) => {
      const arr = [item.y, 0];
      arr.id = index;
      return arr;
    })
    , _clusters = clusterMaker.crUnarySortedCluster(_points);
    _colorItems(data, _clusters)
  }
};

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

const _crData = (values, c, cTotal) => _isArr(values)
  ? values
     .map(_fCrCategoryPoint(c))
     .filter(_fIsCategoryPoint(cTotal))
     .sort(_compareByY)
     .reverse()
  : [];

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
    if (item && item.slice && !item.slice[category]) {
      _arr.push(item.caption)
    }
  })
  return _arr
   .filter(Boolean)
   .join(": ");
};

const toColumn = {

  fCrConfig: (param={}) => {
    return (json, option) => toColumn.crConfig(json, {
      ...option, ...param,
      ..._crCategory(option)
    });
  },

  crConfig: (json, option) => {
    const {
      category,
      cTotal,
      itemSlice,
      time,
      timeId='Tid',
      dfTitle,
      dfTSlice,
      seriaType, seriaColor,
      isCluster,
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
    , _c = data.map(item => item.c)
    , config = Builder()
       .barOrColumnConfig(seriaType, _c)
       .addCaption(_title, _subtitle)
       .addTooltip(Tooltip.category)
       .add({
         chart: { spacingTop: 25 },
         ...crChartOption(_ds, Tid, option)
        })
       .toConfig();

    if (isCluster) {
      _setClusters(data)
    }
    _assign(config.series[0], {
      color: seriaColor,
      data: data
    })
    return config;
  }

};

export default toColumn
