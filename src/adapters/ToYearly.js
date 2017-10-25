import ConfigBuilder from '../charts/ConfigBuilder'
import Tooltip from '../charts/Tooltip'

const CATEGORIES = [
  '01', '02', '03', '04', '05', '06',
  '07', '08', '09', '10', '11', '12'
];

const C = {
  NOW: {
    index: 3,
    color: 'yellow',
  },
  PREV: {
    index: 2,
    color: '#f45b5b'
  },
  AVG: {
    index: 1,
    color: 'black',
    isVisible: false
  },
  RANGE: {
    index: 0,
    color: '#7cb5ec'
  }
};

const _getYear = (str) => {
  return str.split("-")[0];
}
const _getMonth = (str) => {
  return str.split("-")[1];
}

const _crSeria = (
  name, { type='spline', data, color, isVisible=true }
) => {
  return { type, name, data, color, visible:isVisible };
}
const _crItem = (
  name, { index, color, isVisible=true }
) => {
  return { name, index, color, isVisible };
}

const _crPoint = (item) => {
  return {
    c: _getMonth(item[0]),
    y: item[1]
  };
}
const _crValuePoint = item => item[1];
const _crValueYearPoint = item => {
  return {
    v: item[1],
    y: _getYear(item[0])
  }
}
const _findHighLow = (arr) => {
  let h = { v: Number.NEGATIVE_INFINITY, y: '' },
      l = { v: Number.POSITIVE_INFINITY, y: '' };
  arr.forEach(item => {
    if (item.v > h.v) {
      h = item
    }
    if (item.v < l.v ) {
      l = item
    }
  })
  return {
    high: h.v, yHigh: h.y,
    low: l.v, yLow: l.y
  };
}
const _crHighLowPoint = (key, arr) => {
  return {
      c: key,
      ..._findHighLow(arr)
  };
}
const _calcAvg = (arr) => {
  const sum = arr.reduce((acc, a) => acc + a, 0)
      , avg = arr.length !== 0
          ? parseFloat((sum/arr.length).toFixed(4))
          : 0;
  return avg;
}
const _crAvgPoint = (key, arr) => {
  return {
    y: _calcAvg(arr),
    c: key
  };
}

const _crSeriaData = (data, i, year, crPoint=_crPoint) => {
  const arr=[], max=data.length;
  for (; i<max; i++){
    const item = data[i]
    if (_getYear(item[0]) !== year) {
      break;
    }
    arr.push( crPoint(item) )
  }
  return { i, arr: arr.reverse() };
}

const _crSeries = (data) => {
  const firtsItem = data[0][0]
      , _yearNow = _getYear(firtsItem)
      , { i, arr:_dNow } = _crSeriaData(data, 0, _yearNow)
      //
      , prevItem = data[i][0]
      , _yearPrev = _getYear(prevItem)
      , { arr:_dPrev } = _crSeriaData(data, i, _yearPrev);

  return {
    nowSeria: _crSeria(_yearNow, { ...C.NOW, ...{data: _dNow} } ),
    nowItem: _crItem(_yearNow, C.NOW),
    prevSeria: _crSeria(_yearPrev, { ...C.PREV, ...{data: _dPrev} }),
    prevItem: _crItem(_yearPrev, C.PREV)
  };
}

const _hmToSeriaData = (hm, crPoint) => {
  const data = [];
  CATEGORIES.forEach(key => {
    data.push(crPoint(key, hm[key]))
  })
  return data;
}

const _crBaseHm = () => {
  const hm = Object.create(null);
  CATEGORIES.forEach(key => {
    hm[key] = []
  })
  return hm;
}
const _crMonthHm = (i, data, stopYear, crPoint=_crValuePoint) => {
  const hm = _crBaseHm()
      , max = data.length;
  let isBreaked = false;
  for (;i<max;i++){
    const _item = data[i]
        , _y = _item[0];
    if (_y === stopYear ) {
      isBreaked = true
      break;
    }
    const _m = _getMonth(_item[0])
    //hm[_m].push(_item[1])
    hm[_m].push(crPoint(_item))
  }

  return { hm, isBreaked };
}


const _crRangeSeria = (data) => {
  const refYear = parseFloat(_getYear(data[0][0]))
      , stopYear = '' + (refYear - 5)
      , { hm, isBreaked } = _crMonthHm(
            0, data, stopYear, _crValueYearPoint
        )
      , max = data.length
      , _stopYear = isBreaked
           ? stopYear
           : _getYear(data[max-1][0])
      , name = `Range ${refYear}:${_stopYear}`
      , _data = _hmToSeriaData(hm, _crHighLowPoint);

  return {
    rangeSeria: ConfigBuilder()
      .initAreaRange(         
         Tooltip.categoryRHLY, {
           data: _data,
           name: name,
           point: {}
         }
       ).toConfig(),
    rangeItem: _crItem(name, C.RANGE)
  };
}

const _findStartYearIndex = (data, yearStop) => {
  const max = data.length;
  let i = 0;
  for(;i<max;i++){
    if (_getYear(data[i][0]) !== yearStop ) {
       break;
    }
  }
  return i;
}

const _crAvgSeria = (data) => {
  const yearNow = _getYear(data[0][0])
      , fromYear = parseFloat(yearNow) - 1
      , stopYear = '' + (parseFloat(yearNow) - 5)
      , max = data.length
      , startIndex = _findStartYearIndex(data, yearNow)
      , { hm, isBreaked } = _crMonthHm(startIndex, data, stopYear)
      , _stopYear = isBreaked
           ? stopYear
           : _getYear(data[max-1][0])
      , _data = _hmToSeriaData(hm, _crAvgPoint)
      , name = `Avg ${fromYear}:${_stopYear}`;

  return {
    avgSeria: _crSeria(name, {...C.AVG, ...{data: _data}}),
    avgItem: _crItem(name, C.AVG)
  };
}


const _crZhConfig = (option, { legend }) => {
  const { value, dataSource, itemCaption } = option
      , _id = value + '_' + 'YEARLY';
  return {
    id: _id,
    key: _id,
    itemCaption,
    isWithoutIndicator: true,
    isWithoutAdd: true,
    isWithLegend: true,
    legend: legend,
    dataSource: dataSource
  };
}


const ToYearly = {
  toConfig(data, option) {
    const { title, subtitle } = option
    , {
        nowSeria, nowItem,
        prevSeria, prevItem
      } = _crSeries(data)
    , { rangeSeria, rangeItem } = _crRangeSeria(data)
    , { avgSeria, avgItem } = _crAvgSeria(data)
    , legend = [ nowItem, prevItem, rangeItem, avgItem ]
    , config = ConfigBuilder()
       .initBaseCategories(CATEGORIES)
       .add('chart', { spacingTop: 25, marginTop: 45 })
       .addCaption(title, subtitle)
       .addSeriaBy(0, rangeSeria)
       .addSeriaBy(1, avgSeria)
       .addSeriaBy(2, prevSeria)
       .addSeriaBy(3, nowSeria)
       .addTooltip(Tooltip.category)
       .add('zhConfig', _crZhConfig(option, { legend }))
       .toConfig();

    return config;
  }
}

export default ToYearly
