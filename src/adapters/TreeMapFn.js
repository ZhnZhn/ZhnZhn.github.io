import { isNumber } from '../utils/isTypeFn';
import formatNumber from '../utils/formatNumber';

import { roundBy } from '../math/mathFn';

import { domSanitize } from './AdapterFn';
import { sortDescByPnValue } from './compareByFn';

import {
  COLOR_CATEGORY_LEVEL1,
  COLOR_CATEGORY_LEVEL2,
  COLOR_CATEGORY_LEVEL3
} from '../constants/Color'

import {
  CL_TREE_MAP_PERCENT_BLACK
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
  , [index2, sum2] = _findLevelBy(data, index1, sum1, _v2, propName);
  return [
    index1,
    index2,
    roundBy(sum1 / _onePercent, 1),
    roundBy(sum2 / _onePercent, 1)
  ];
};

const _setColorLevelTo = (
  point,
  colorLevel,
  level
) => {
  point.color = colorLevel
  point._level = level
}

const _addColor = (
  data,
  levelIndex1,
  levelIndex2
) => {
  data.forEach((point, pointIndex) => {
    _setColorLevelTo(point, ...(pointIndex < levelIndex1
      ? [COLOR_CATEGORY_LEVEL1, 1]
      : pointIndex < levelIndex2
      ? [COLOR_CATEGORY_LEVEL2, 2]
      : [COLOR_CATEGORY_LEVEL3, 3]
    ))
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
    levelIndex2,
    sumOfPercentLevel1,
    sumOfPercentLevel2
  ] = _findLevelIndex(
    data,
    total,
    level1,
    level2,
    propName
  );
  _addColor(data, leveIndex1, levelIndex2)
  return [
    sumOfPercentLevel1,
    sumOfPercentLevel2
  ];
}

const _crValuePercentToken = (
  percent,
  value
) => `${formatNumber(value)} (${percent}%)`
, _crPercentToken = percent => percent >= 1
   ? `${percent}%`
   : `.${(''+percent).split(".")[1]}%`

, _fCrName = (crToken) => (
  label,
  percent,
  value
) => domSanitize(`${label}<br/><span class="${CL_TREE_MAP_PERCENT_BLACK}">${crToken(percent, value)}</span>`)

, _crValuePercentName = _fCrName(_crValuePercentToken)
, _crPercentName = _fCrName(_crPercentToken)

, _isPercentName = (
  data
) => data.length > 8 && data[0].value > 1000;
export const getCrPointName = (
  data
) => _isPercentName(data)
  ? _crPercentName
  : _crValuePercentName

const _crPointName = (
  percent
) => isNumber(percent)
  ? `${percent}%`
  : "";
export const crPointName = _fCrName(_crPointName)

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
        item.percent > 1 ? item.percent : ""
      )
    })
    sortDescByPnValue(data)
    return addColorsTo({ data, total });
  }
}
