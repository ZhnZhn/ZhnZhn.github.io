import JSONstat from 'jsonstat';

import {
  CHT_TREE_MAP,
  CHT_TREE_MAP_CLUSTER,
  CHT_TREE_MAP_2,
  CHT_TREE_MAP_2_CLUSTER
} from '../../constants/ChartType';

import domSanitize from '../../utils/domSanitize';
import pipe from '../../utils/pipe';
import {
  crTreeMapConfig,
  fAddCaption,
  fAdd,
  toConfig
} from '../../charts/configBuilderFn';

import {
  addColorsTo,
  crPointName
} from '../TreeMapFn';
import {
  sortDescByPnValue
} from '../compareByFn';
import {
  crTitle,
  crTid,
  crChartOption,
  roundBy
} from './fnAdapter';

const _isArr = Array.isArray;

const _fCrTreeMapPoint = (
  c,
  title
) => (v, i) => {
   const { value } = v;
   return {
     label: domSanitize(c.Category(i).label),
     value,
     title
   };
};

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
   /*
   if ( hm[p.label].d !== depth) {
     return false;
   }
   */
   return p.y !== null && p.y !== 0;
};

const _crCategory = (
  option,
  by,
  depth
) => {
  const {
    items=[],
    dfC,
    dfT,
    dfC2,
    dfT2
  } = option;
  switch(by){
    case '2':
      return {
        category: dfC2,
        cTotal: dfT2,
        itemSlice: items[0].slice,
        depth
      };
    default:
      return {
        category: dfC,
        cTotal: dfT,
        itemSlice: items[1].slice,
        depth
      };
  }
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
  values,
  categories,
  Tid,
  option
) => {
  const {
    selectOptions,
    depth,
    cTotal
  } = option;

  return _isArr(values) ? sortDescByPnValue(values
    .map(_fCrTreeMapPoint(categories, Tid))
    .filter(_fIsPoint(cTotal, _toHm(selectOptions[0]), depth))
  ) : [];
};

const _crConfig = (
  json,
  option
) => {
  const  {
     category,
     itemSlice,
     time,
     dfTSlice,
     isCluster,
     items=[]
  } = option
  , ds = JSONstat(json).Dataset(0)
  , categories = ds.Dimension(category)
  , Tid = crTid(time, ds)
  , _title = crTitle(option)
  , _subtitle = `${items[1].caption || ''}: ${Tid}`
  , values = ds.Data({ Tid, ...itemSlice, ...dfTSlice })
  , _d1 = _crData(values, categories, Tid, option )
  , [data, total] = _addPercent(_d1)

  if (isCluster) {
    addColorsTo({ data, total })
  }

  return pipe(
    crTreeMapConfig(data),
    fAddCaption(_title, _subtitle),
    fAdd(crChartOption(ds, Tid, option)),
    toConfig
  );
}

const _fCrConfig = (
  param={},
  config={}
) => (
  json,
  option
) => _crConfig(json, {
  ...option,
  ...param,
  ..._crCategory(option, config.by, config.depth)
});

const routerTreeMap = {
  [CHT_TREE_MAP]: _fCrConfig(),
  [CHT_TREE_MAP_CLUSTER]: _fCrConfig(
    { isCluster: true }
  ),
  [CHT_TREE_MAP_2]: _fCrConfig(
    {},
    { depth: "d2" }
  ),
  [CHT_TREE_MAP_2_CLUSTER]: _fCrConfig(
    { isCluster: true },
    { depth: "d2" }
  )
};

export default routerTreeMap
