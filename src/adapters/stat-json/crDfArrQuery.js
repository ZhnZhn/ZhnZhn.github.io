import isCategory from './isCategory';
import crArrQuery from './crArrQuery';
import crQueryItem from './crQueryItem';

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
  if (dfC && isCategory(seriaType)) {
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
