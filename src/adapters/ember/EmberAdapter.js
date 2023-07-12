import crAdapterType1 from '../crAdapterType1';
import {
  compareByDate
} from '../compareByFn';

import {
  ymdToUTC,
  getValue,
  isTotalData
} from './fnAdapter';

const SOURCE_FOSSIL = 'Fossil'
, SOURCE_CLEAN = 'Clean'
, _getObjectKeys = Object.keys
, _crTotalData = (
  json,
  metric
) => {
  const _hm = json.reduce((hm, item) => {
    if (item.variable === SOURCE_FOSSIL
      || item.variable === SOURCE_CLEAN
    ) {
      const _pn = ''+item.year;
      hm[_pn] = (hm[_pn] || 0) + item[metric]
    }
    return hm;
  }, {});
  return _getObjectKeys(_hm).map(key => [
    ymdToUTC(parseInt(key, 10)),
    _hm[key]
  ]);
}
, _crSourceData = (
  json,
  metric,
  source
) => json.reduce((data, item) => {
  if (item.variable === source) {
    data.push([
      ymdToUTC(item.year),
      item[metric]
    ])
  }
  return data;
}, []);

const crData = (
  json,
  options
) => {
  const {
    items
  } = options
  , metric = getValue(items[1])
  , source = getValue(items[2])
  , data = isTotalData(source)
     ? _crTotalData(json, metric)
     : _crSourceData(json, metric, source);

  return data.sort(compareByDate);
};

const EmberAdapter = crAdapterType1({
  crData
});

export default EmberAdapter
