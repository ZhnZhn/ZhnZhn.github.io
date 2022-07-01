import {
  COLOR_PERIOD,
  COLOR_BASE1,
  COLOR_BASE2,
  crMonoColor
} from '../charts/MonoColorFn';

const _findLevelBy = (
  data,
  from,
  sum,
  stopSum
) => {
  const _maxIndex = data.length;
  if ( from >= _maxIndex ){
    return [_maxIndex, sum];
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
  return [index, sum];
};

const _findLevelIndex = (
  data,
  level1,
  level2
) => {
  const _t = data.reduce((acc, p) => acc + p.value, 0)
  , _v1 = (_t/100)*level1
  , _v2 = (_t/100)*level2
  , [index1, sum1] = _findLevelBy(data, 0, 0, _v1)
  , [index2] = _findLevelBy(data, index1, sum1, _v2);

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
       point.color = crMonoColor(COLOR_BASE1, deltaColor)
     }
   })
};

export const addColorsTo = (
  data,
  level1=60,
  level2=90
) => {
  const [
    leveIndex1,
    levelIndex2
  ] = _findLevelIndex(
    data,
    level1,
    level2
  );
  _addColor(data, leveIndex1, levelIndex2)
}
