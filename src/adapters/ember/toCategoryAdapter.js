import domSanitize from '../../utils/domSanitize';
import crCategoryConfig from '../crCategoryConfig';
import fToCategorySeries from '../fToCategorySeries';
import { sortDescByPnY } from '../compareByFn';
import {
  isCategoryCluster,
  isTotalVariable,
  isTotalData,
  getCountryName,
  reduceToHmBy,
  getValue,
  roundBy
} from './fnAdapter';

const _getObjectKeys = Object.keys;

const _crCategoryPoint = (
  y,
  n
) => {
  const c = domSanitize(n);
  return { y, name: c, c };
}

const _crTotalData = (
  json,
  pnMetric
) => {
  const hm = reduceToHmBy((_hm, item) => {
    const c = getCountryName(item)
    if (c && isTotalVariable(item)) {
      _hm[c] = (_hm[c] || 0) + item[pnMetric]
    }
    return _hm;
  }, json);
  return _getObjectKeys(hm)
    .map(k => _crCategoryPoint(
      roundBy(hm[k], 2),
      k
    ));
};

const _crData = (
  json,
  pnMetric
) => json.reduce((data, item) => {
  const c = getCountryName(item)
  if (c) {
    data.push(_crCategoryPoint(
      item[pnMetric],
      c
    ))
  }
  return data;
}, [])

const toCategoryAdapter = {
  toConfig: (json, option) => {
    const {
      title,
      subtitle,
      seriaType,
      seriaColor,
      _itemKey,
      time,
      dataSource,
      items
    } = option
    , pnMetric = getValue(items[1])
    , source = getValue(items[2])
    , data = isTotalData(source)
       ? _crTotalData(json, pnMetric)
       : _crData(json, pnMetric)

    , _arrSeriaType = seriaType.split('_')
    , config = crCategoryConfig(
        subtitle,
        title,
        _arrSeriaType[0],
        seriaColor,
        sortDescByPnY(data),
        isCategoryCluster(seriaType)
    );

    config.zhConfig = {
      id: _itemKey,
      key: _itemKey,
      itemCaption: `${subtitle}: ${title}`,
      itemTime: time,
      dataSource
    }
    return { config };
  }
}

toCategoryAdapter.toSeries = fToCategorySeries(
  toCategoryAdapter.toConfig
)

export default toCategoryAdapter
