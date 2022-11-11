import clusterMaker from '../math/k-means';
import Builder from '../charts/ConfigBuilder';

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

const _crPoints = (
  data
) => data.map((item, index) => {
  const _arrPoint = [item.y, 0];
  _arrPoint.id = index;
  return _arrPoint;
});

const _addClustersTo = (data) => {
  if (data.length !== 0) {
    const _points = _crPoints(data)
    , _clusters = clusterMaker.crUnarySortedCluster(_points);
    _colorItems(data, _clusters)
  }
  return data;
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
) => Builder()
  .barOrColumnConfig(seriaType, _crCategories(data))
  .addCaption(title, subtitle)
  .addSeriaBy(0, {
    color: seriaColor,
    data: isCluster ? _addClustersTo(data) : data
  })
  .toConfig();

export default crCategoryConfig
