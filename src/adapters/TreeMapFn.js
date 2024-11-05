import {
  isNumber,
  roundBy
} from './AdapterFn';
import {
  sortDescByPnValue
} from './compareByFn';

import {
  COLOR_PERIOD,
  COLOR_BASE1,
  COLOR_BASE2,
  COLOR_BASE3,
  crMonoColor
} from '../charts/MonoColorFn';
import {
  CL_TREE_MAP_PERCENT
} from './CL';

const _findLevelBy = (
  data,
  from,
  sum,
  stopSum,
  propName
) => {
  const _maxIndex = data.length;
  if ( from >= _maxIndex ){
    return [_maxIndex, sum];
  }

  let index = _maxIndex, i = from;
  for(;i<_maxIndex;i++){
    sum +=data[i][propName]
    if (sum>=stopSum) {
      index = i;
      break;
    }
  }

  if (index < _maxIndex ){
    index += 1
  }
  return [index, sum];
};

const _findLevelIndex = (
  data,
  total,
  level1,
  level2,
  propName
) => {
  const _onePercent = total/100
  , _v1 = _onePercent * level1
  , _v2 = _onePercent * level2
  , [index1, sum1] = _findLevelBy(data, 0, 0, _v1, propName)
  , [index2] = _findLevelBy(data, index1, sum1, _v2, propName);

  return [
    index1,
    index2
  ];
};

const _addColor = (
  data,
  levelIndex1,
  levelIndex2
) => {
  const _numberOfPoints2 = levelIndex2 - levelIndex1
  , _numberOfPoints3 = data.length - levelIndex2;
  let deltaColor;
  data.forEach((point, pointIndex) => {
     if (pointIndex < levelIndex1){
       deltaColor = pointIndex * ( COLOR_PERIOD / levelIndex1 );
       point.color = crMonoColor(COLOR_BASE1, deltaColor);
     } else if ( pointIndex < levelIndex2 ) {
       deltaColor = (pointIndex-levelIndex1) * ( COLOR_PERIOD / _numberOfPoints2 );
       point.color = crMonoColor(COLOR_BASE2, deltaColor);
     } else {
       deltaColor = (pointIndex - levelIndex2) * ( COLOR_PERIOD / _numberOfPoints3 )
       point.color = crMonoColor(COLOR_BASE3, deltaColor)
       point._level = 3       
     }
   })
};

export const addColorsTo = ({
  data,
  total,
  propName="value",
  level1=60,
  level2=90
}) => {
  const [
    leveIndex1,
    levelIndex2
  ] = _findLevelIndex(
    data,
    total,
    level1,
    level2,
    propName
  );
  _addColor(data, leveIndex1, levelIndex2)
}

export const crPointName = (
  label,
  percent
) => {
  const _percent = isNumber(percent)
    ? `<span class="${CL_TREE_MAP_PERCENT}">${percent}%</span>`
    : '';
  return `${label}<br/>${_percent}`;
}

export const addPercentAndColorToData = (
  data,
  total
) => {
  if (total !== 0) {
    const _onePercent = total/100;
    data.forEach(item => {
      item.percent = roundBy(item.value/_onePercent)
      item.name = crPointName(
        item.label,
        item.percent > 1 ? item.percent : ''
      )
    })
    sortDescByPnValue(data)
    addColorsTo({ data, total })
  }
}
