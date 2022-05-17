import { roundBy } from '../AdapterFn';
import C from './conf';

const _fItemWithRatio = (
  hm,
  sum
) => (item) => {
  const { name } = item
  , _points = hm[name]
  , _p = _points[_points.length-1]
  , _ratio = _p
        ? ' ' + roundBy((_p.y/sum)*100, 1)+'%'
        : '';
  return {
     ...item,
     name: name + _ratio
  };
}

const _hasNotToken = (
  str,
  token
) => str.indexOf(token) === -1;

const _calcRecentSum = (
  hm
) => {
  let key, sum = 0;
  for (key in hm) {
    if (_hasNotToken(key, ', nes') && _hasNotToken(key, C.WORLD)) {
      const points = hm[key];
      sum += points[points.length-1].y
    }
  }
  return sum;
};

export const toAllLegend = (
  arr,
  hm,
  measure
) => {
  const sum = _calcRecentSum(hm)
  , crItemWithRatio = _fItemWithRatio(hm, sum);

  return sum !== 0
   && measure !== C.AVG_PER_W
   && measure !== C.AVG_PER_Q
     ? arr.map(crItemWithRatio)
     : arr;
}

export const toWorldLegend = (
  arr,
  hm
) => {
  const world = hm[C.WORLD]
  , sum = world
      ? world[world.length-1].y
      : _calcRecentSum(hm)
  , crItemWithRatio = _fItemWithRatio(hm, sum);

  return sum !== 0 && sum != null
     ? arr.map(crItemWithRatio)
     : arr;
}
