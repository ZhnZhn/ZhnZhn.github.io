import crArrQuery from './crArrQuery';
import crQueryItem from './crQueryItem';

const _checkTop = (isTop, strN, arr) => {
  if (isTop) {
    arr.push(crQueryItem('Tid', 'top', strN))
  }
};

const crDfArrQuery = ({
  items=[],
  isTop12,
  isTop6
}) => {
  const arrQuery = crArrQuery(items);

  _checkTop(isTop12, '12', arrQuery)
  _checkTop(isTop6, '6', arrQuery)

  return arrQuery;
};

export default crDfArrQuery
