
import fns from './fnAdapter'
import C from './conf'

const fnLegend = {

  fItemWithRatio: (hm, sum) => (item) => {
    const { name } = item
        , _points = hm[name]
        , _p = _points[_points.length-1]
        , _ratio = _p
              ? ' ' + fns.roundBy((_p.y/sum)*100, 1)+'%'
              : '';
    return {
       ...item,
       name: name + _ratio
    };
  },

  calcRecentSum: (hm) => {
    let key, sum = 0;
    for (key in hm) {
      if (
           key.indexOf(', nes') === -1
           && key.indexOf(C.WORLD) === -1
      ) {
        const points = hm[key];
        sum += points[points.length-1].y
      }
    }
    return sum;
  },

  toAllLegend: (arr, hm, measure) => {
    const sum = fnLegend.calcRecentSum(hm)
        , crItemWithRatio = fnLegend.fItemWithRatio(hm, sum);
    return (sum !== 0 && measure !== C.AVG_PRICE)
       ? arr.map(crItemWithRatio)
       : arr;
  },

  toWorldLegend: (arr, hm) => {
    const world = hm[C.WORLD]
        , sum = world
            ? world[world.length-1].y
            : fnLegend.calcRecentSum(hm)
        , crItemWithRatio = fnLegend.fItemWithRatio(hm, sum);

    return (sum !== 0 && sum != null)
       ? arr.map(crItemWithRatio)
       : arr;
  }
};

export default fnLegend
