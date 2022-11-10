import Builder from '../charts/ConfigBuilder';
import { tooltipCategory } from '../charts/Tooltip';

import clusterMaker from '../math/k-means';

const _assign = Object.assign;

const COLORS = [
  '#9ecae1',
  '#6baed6',
  '#4292c6',
  '#2171b5',
  '#08519c',
  '#08306b',
  '#74c476'
];

const _colorItems = (
  data,
  clusters
) => {
  clusters.forEach((cluster, colorIndex) => {
     cluster.points.forEach(p => {
       data[p.id].color = COLORS[colorIndex]
     })
  })
};

const _setClustersTo = (data) => {
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

const _crCategories = (
  data
) => data.map(item => item.c)

//data = [{ y, name, c}]
const crCategoryConfig = (
  title,
  subtitle,
  seriaType,
  seriaColor,
  data,
  isCluster
) => {
  const _categories = _crCategories(data)
  , config = Builder()
     .barOrColumnConfig(seriaType, _categories)
     .addCaption(title, subtitle)
     .addTooltip(tooltipCategory)
     .add({ chart: { spacingTop: 25 } })
     .toConfig();

  if (isCluster) {
    _setClustersTo(data)
  }
  _assign(config.series[0], {
    color: seriaColor,
    data: data
  })

  return config;
}

export default crCategoryConfig
