import JSONstat from 'jsonstat';
import Builder from '../../charts/ConfigBuilder';

import {
  addColorsTo,
  crPointName
} from '../TreeMapFn';
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
   const label = c.Category(i).label
   , { value } = v;
   return {
     value,
     label,
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

const _compareByValue = (a, b) => b.value - a.value;

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
  return data.map(p => {
    p.percent = roundBy(p.value/_onePercent);
    p.name = crPointName(p.label, p.value, p.percent)
    return p;
  });  
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
  if (!_isArr(values)) {
    return [];
  }
  return values
    .map(_fCrTreeMapPoint(categories, Tid))
    .filter(_fIsPoint(cTotal, _toHm(selectOptions[0]), depth))
    .sort(_compareByValue);
};

const toTreeMap = {
  crConfig: (json, option) => {
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
    , data = _addPercent(_d1)

    if (isCluster) {
      addColorsTo(data)
    }

    const config = Builder()
      .treeMapConfig(data)
      .addCaption(_title, _subtitle)
      .add(crChartOption(ds, Tid, option))
      .toConfig();

    return config;
  },

  fCrConfig: (param={}, config={}) => {
    return (json, option) => toTreeMap.crConfig(json, {
      ...option,
      ...param,
      ..._crCategory(option, config.by, config.depth)
    });
  }
};

export default toTreeMap
