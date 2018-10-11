
import C from './conf'

const _toSortedArr = obj => {
  const arr = [];
  for (let propName in obj){
    arr.push(obj[propName])
  }
  return arr.sort();
};

const _crPoint = (y, forSort) => ({
  y: y,
  forSort: forSort !== undefined
    ? forSort : y
});

const _fCrValuePoint = pnValue =>
   item => _crPoint(item[pnValue]);

const _crNetWeightPoint = item => {
  const _w = item.NetWeight || item.TradeQuantity
  , _y = _w !== 0 ? _w
    : item.TradeValue ? undefined : 0 ;
  return _crPoint(_y);
};

const _crAvgPricePoint = item => {
  const {
    TradeValue,
    NetWeight, TradeQuantity
  } = item
  , _NetWeight = NetWeight || TradeQuantity
  , _y = (_NetWeight && TradeValue != null)
       ? parseFloat((TradeValue/_NetWeight).toFixed(2))
       : undefined;
  return _crPoint(_y, _NetWeight);
};

const _rFnCrPoint = {
  fDf: _fCrValuePoint,
  [C.NET_WEIGHT]: _crNetWeightPoint,
  [C.AVG_PRICE]: _crAvgPricePoint
};

const _fPoint = pnValue => {
  const _crValue = _rFnCrPoint[pnValue]
    ? _rFnCrPoint[pnValue]
    : _rFnCrPoint.fDf(pnValue);
  return item => {
    return {
      isCategory: true,
      x: item.period,
      ..._crValue(item)
    };
  };
};

const _getRecentValueForSort = points => {
   const len = points && points.length;
   return len && len > 0
     ? points[len-1].forSort
     : undefined;
};

const fnHm = {

  toSeriaNames: (hm, fnCompareBy) => {
    const arr = [];
    for (let propName in hm){
      if (propName !== C.WORLD) {
        const points = hm[propName];
        arr.push({
          value: _getRecentValueForSort(points),
          name: propName
        })
      }
    }
    return arr
      .sort(fnCompareBy)
      .reverse();
  },

  toHmCategories({
    dataset,
    pnCountry='ptTitle',
    pnValue='TradeValue'
  }) {
    const _hm = Object.create(null)
    , _category = Object.create(null)
    , _crPoint = _fPoint(pnValue);

    let _point
    dataset.forEach(item => {      
      _point = _crPoint(item)
      if (_point.y != null) {
        const ptTitle = item[pnCountry];

        if (_hm[ptTitle] === undefined) {
          _hm[ptTitle] = []
        }
        _hm[ptTitle].push(_point)

        const period = item.period;
        if (_category[period] === undefined) {
          _category[period] = period
        }
      }
    })
    return {
      categories: _toSortedArr(_category),
      hm: _hm
    };
  }

};

export default fnHm
