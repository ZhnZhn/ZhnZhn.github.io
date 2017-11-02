import JSONstat from 'jsonstat';
import clusterMaker from '../../math/k-means'

import ConfigBuilder from '../../charts/ConfigBuilder'
import Tooltip from '../../charts/Tooltip'

import fnAdapter from './fnAdapter'

const _crZhConfig = fnAdapter.crZhConfig;
const _crInfo = fnAdapter.crInfo;


const C = {
  TITLE: 'Statisctics Norway: All Items'
};


const COLORS = [
      '#9ecae1', '#6baed6',
      '#4292c6', '#2171b5',
      '#08519c', '#08306b',
      '#74c476'
  ];

const _crCategoryPoint = (c, v, i) => {
  return {
    y: v.value,
    c: c.Category(i).label,
  };
}
const _isCategoryPoint = (dfT, p) => {
  if (dfT && p.c === dfT) {
    return false;
  }
  return p.y !== null && p.y !== 0;
}
const _compareByY = (a, b) => a.y - b.y;

const _colorItems = (data, _clusters) => {
  _clusters.forEach((cluster, colorIndex) => {
      cluster.points.forEach(p => {
        data[p.id].color = COLORS[colorIndex]
      })
  })
}

const _setClusters = (data) => {
  const _points = data.map((item, index) => {
           const arr = [item.y, 0 ];
           arr.id = index;
           return arr;
        })
       , _clusters = clusterMaker.crUnarySortedCluster(_points)
  _colorItems(data, _clusters)
}

const _crColumnSeria = (values, c, time, option) => {
  const _crPoint = _crCategoryPoint.bind(null, c)
      , _fnIs = _isCategoryPoint.bind(null, option.dfT)
      , data = values.map(_crPoint)
         .filter(_fnIs)
         .sort(_compareByY)
         .reverse()
     , _c = data.map(item => item.c)
     , { seriaType, isCluster, items=[] } = option
     , _subtitle = `${items[1].caption || ''}: ${time}`;

  const config = ConfigBuilder()
    .initBaseColumnOrBar(_c, seriaType)
    .addCaption(C.TITLE, _subtitle)
    .add('chart', { spacingTop: 25 })
    .addTooltip(Tooltip.category)
    .add('yAxis', { gridZIndex: 100 })
    .add('zhConfig', _crZhConfig(option))
    .toConfig()

  if (isCluster) {
    _setClusters(data)
  }

  config.series[0].data = data

  return config;
}

const toColumn = {
  crConfig: (json, option) => {
    const  { items, dfC, time } = option
    , ds = JSONstat(json).Dataset(0)
    , times = ds.Dimension("Tid").id
    , _c = dfC || items[0].category
    , categories = ds.Dimension(_c)
    , tidId = time || times[times.length-1]
    , values = ds.Data({
       Tid: tidId,
       ...items[1].slice
    })
    , config = _crColumnSeria(values, categories, tidId, option);

    config.info = _crInfo(ds)
    return config;
  },

  fCrConfig: (param={}) => {
    return (json, option) =>
      toColumn.crConfig(json, { ...option, ...param });
  }
}

export default toColumn
