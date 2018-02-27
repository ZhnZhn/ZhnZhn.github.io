import JSONstat from 'jsonstat';

import Chart from '../../charts/Chart'
import ConfigBuilder from '../../charts/ConfigBuilder'
import Tooltip from '../../charts/Tooltip'

import fnAdapter from './fnAdapter'

const {
  crTid, crChartOption,
  numberFormat
} = fnAdapter;

const C = {
  TITLE: 'Statisctics Norway: All Items'
};

const NUMBER_STYLE = 'style="color:#333;"';
const _crPointName = (label, value) => {
  return `${label} <br/>
  <span ${NUMBER_STYLE}>${numberFormat(value)}</span>`;
}

const _fCrTreeMapPoint = (c, title) => {
  return (v, i) => {
    const label = c.Category(i).label
       ,  value = v.value;
    return {
      name: _crPointName(label, value),
      value, label, title
    };
  };
}

const _toHm = (arr) => {
  const hm = Object.create(null)
  arr.forEach(item => {
    hm[item.caption] = item
  })
  return hm;
}

const _fIsPoint = (dfT, hm, depth) => {
  return p => {
    if (dfT && p.label === dfT) {
      return false;
    }
    if ( hm[p.label].d !== depth) {
      return false;
    }
    return p.y !== null && p.y !== 0;
  };
}

const _findLevelBy = (data, from, sum, stopSum) => {
  const _maxIndex = data.length;
  if ( from >= _maxIndex ){
    return { index: _maxIndex, sum };
  }

  let index = _maxIndex, i = from;
  for(;i<_maxIndex;i++){
    sum +=data[i].value
    if (sum>=stopSum) {
      index = i;
      break;
    }
  }

  if (index < _maxIndex ){
    index += 1
  }
  return { index, sum };
}

const _findLevelIndex = (data, level1, level2) => {
  const _t = data.reduce((acc, p) => acc + p.value, 0)
      , _v1 = (_t/100)*level1
      , _v2 = (_t/100)*level2
      , {
          index:index1,
          sum: sum1
        } = _findLevelBy(data, 0, 0, _v1)
      , {
          index:index2
        } = _findLevelBy(data, index1, sum1, _v2);

  return { index1, index2 };
}

const _compareByValue = (a, b) => a.value - b.value;

const _crCategory = (option, by, depth) => {
  const { items=[], dfC, dfT, dfC2, dfT2 } = option;
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
}

const _addPercent = (data) => {
  const _total = data.reduce((acc, item) => acc + item.value, 0)
     , _onePercent = _total/100;
  return data.map(p => {
     return {
       ...p,
       percent: parseFloat((p.value/_onePercent).toFixed(2))
     }
  });
}


const _addColor = function(data, level60, level90){
  const period = Chart.COLOR_PERIOD
      , base1 = Chart.COLOR_BASE1
      , base2 = Chart.COLOR_BASE2;

  const _level90 = level90 - level60;
  let deltaColor;
  data.forEach((point, pointIndex) => {
     if (pointIndex < level60){
       deltaColor = pointIndex * ( period / level60 );
       point.color = Chart.fCreateMonoColor(base1, deltaColor);
     } else if ( pointIndex < level60+_level90 ) {
       deltaColor = (pointIndex-level60) * ( period / _level90 );
       point.color = Chart.fCreateMonoColor(base2, deltaColor);
     } else {
       point.color = Chart.fnGetMonoColor(pointIndex-level60-_level90)
     }
   })
}


const _crData = (values, categories, Tid, option) => {
  const { selectOptions, depth, cTotal } = option;
  if (!Array.isArray(values)) {
    return [];
  }
  return values
    .map(_fCrTreeMapPoint(categories, Tid))
    .filter(_fIsPoint(cTotal, _toHm(selectOptions[0]), depth))
    .sort(_compareByValue)
    .reverse();
};

const toTreeMap = {
  crConfig: (json, option) => {
    const  {
             category, itemSlice, time, dfTSlice,
             seriaType, isCluster, items=[]
           } = option
        , ds = JSONstat(json).Dataset(0)
        , categories = ds.Dimension(category)
        , Tid = crTid(time, ds)
        , _subtitle = `${items[1].caption || ''}: ${Tid}`
        , values = ds.Data({ Tid, ...itemSlice, ...dfTSlice })
        , _d1 = _crData(values, categories, Tid, option )
        , _c = _d1.map(item => item.c)
        , _data = _addPercent(_d1)
        , { index1, index2 } = _findLevelIndex(_data, 60, 90);

  if (isCluster) {
    _addColor(_data, index1, index2)
  }

   const _seria = ConfigBuilder()
     .initTreeMap(
        Tooltip.treeMap, {
          zhSeriaId: fnAdapter.crId(),
          data: _data
        }
      )
      .toConfig();
    const config = ConfigBuilder()
      .initBaseTreeMap(_c, seriaType)
      .addCaption(C.TITLE, _subtitle)
      .addSeries(_seria)
      .add({
        chart: {
          spacingTop: 25,
          marginTop: 50,
          marginRight: 5,
          height: 500,
        },
        ...crChartOption(ds, Tid, option)
       })
      .alignButtonExport()
      .toConfig();

    return config;
  },

  fCrConfig: (param={}, config={}) => {
    return (json, option) => toTreeMap.crConfig(json, {
      ...option, ...param,
      ..._crCategory(option, config.by, config.depth)
    });
  }
}

export default toTreeMap
