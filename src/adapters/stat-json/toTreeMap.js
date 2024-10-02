import {
  CHT_TREE_MAP,
  CHT_TREE_MAP_CLUSTER,
  CHT_TREE_MAP_2,
  CHT_TREE_MAP_2_CLUSTER
} from '../../constants/ChartType';

import pipe from '../../utils/pipe';
import {
  crTreeMapConfig,
  fAddCaption,
  fAdd,
  toConfig
} from '../../charts/configBuilderFn';

import {
  crTreeMapData
} from '../JsonStatFn';
import {
  addColorsTo,
  crPointName
} from '../TreeMapFn';
import {
  sortDescByPnValue
} from '../compareByFn';
import {
  crTitle,
  crChartOption,
  roundBy
} from './fnAdapter';

const _toHm = (arr) => {
  const hm = Object.create(null)
  arr.forEach(item => {
    hm[item.caption] = item
  })
  return hm;
};

const _fIsPoint = (
  dfT,
  hm,
  depth
) => p => {
   if (dfT && p.label === dfT) {
     return false;
   }
   if (p.label.split(' ')[0].length !== 2) {
     return false;
   }
   return p.y !== null && p.y !== 0;
};

const _addPercent = (
  data
) => {
  const _total = data
    .reduce((acc, item) => acc + item.value, 0)
  , _onePercent = _total/100;
  return [
    data.map(p => {
      p.percent = roundBy(p.value/_onePercent);
      p.name = crPointName(p.label, p.percent)
      return p;
    }),
    _total
  ];
};

const _crData = (
  json,
  option
) => {
  const {
    selectOptions,
    depth,
    cTotal
  } = option;

  return sortDescByPnValue(
    crTreeMapData(json, option.time)
      .filter(_fIsPoint(
         cTotal,
         _toHm(selectOptions[0]),
         depth
      ))
  );
};

const _crSubtitle = (
  items,
  time
) => `${((items ||[])[1] || {}).caption || ''}: ${time}`;

const _crConfig = (
  json,
  option
) => {
  const {
    time
  } = option
  , _title = crTitle(option)
  , _subtitle = _crSubtitle(option.items, time)
  , _data = _crData(json, option)
  , [data, total] = _addPercent(_data)

  if (option.isCluster) {
    addColorsTo({ data, total })
  }

  return pipe(
    crTreeMapConfig(data),
    fAddCaption(_title, _subtitle),
    fAdd(crChartOption(void 0, time, option, json)),
    toConfig
  );
};

const _fCrConfig = (
  configOption={}
) => (
  json,
  option
) => _crConfig(json, {
  ...option,
  ...configOption
});

const routerTreeMap = {
  [CHT_TREE_MAP]: _fCrConfig(),
  [CHT_TREE_MAP_CLUSTER]: _fCrConfig({
     isCluster: true
  }),
  [CHT_TREE_MAP_2]: _fCrConfig({
     depth: "d2"
  }),
  [CHT_TREE_MAP_2_CLUSTER]: _fCrConfig({
     isCluster: true,
     depth: "d2"
  })
};

export default routerTreeMap
