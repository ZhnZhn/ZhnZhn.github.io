import crArrQuery from './crArrQuery';
import crQueryItem from './crQueryItem';

const _isCategory = seriaType =>
   seriaType === "BAR_CLUSTER"
|| seriaType === "BAR_SET"
|| seriaType === "COLUMN_SET"
|| seriaType === "COLUMN_CLUSTER"
|| seriaType === "TREE_MAP"
|| seriaType === "TREE_MAP_CLUSTER"
|| seriaType === "TREE_MAP_2"
|| seriaType === "TREE_MAP_2_CLUSTER";

const _checkTop = (isTop, strN, arr) => {
  if (isTop) {
    arr.push(crQueryItem('Tid', 'top', strN))
  }
};

const crDfArrQuery = (option) => {
  const {
    items=[],
    isTop12,
    isTop6
  } = option
  , arrQuery = crArrQuery(items);

  const { dfC, seriaType } = option;
  if (dfC && _isCategory(seriaType)) {
    const {time, timeId='Tid'} = option
    , _arr = arrQuery.filter(item => item.code !== dfC);
    _arr.unshift(crQueryItem(dfC, 'all', '*'))
    _arr.unshift(crQueryItem(timeId, 'item', time))
    return _arr;
  }

  _checkTop(isTop12, '12', arrQuery)
  _checkTop(isTop6, '6', arrQuery)

  return arrQuery;
};

export default crDfArrQuery
