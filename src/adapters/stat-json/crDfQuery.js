import crDfArrQuery from './crDfArrQuery';
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

const _checkSeriaCategory = option => {
  const arrQuery = crDfArrQuery(option)
  , { dfC, seriaType } = option;
  if (dfC && _isCategory(seriaType)) {
    const _arr = arrQuery.filter(item => item.code !== dfC);
    _arr.unshift(crQueryItem(dfC, 'all', '*'))
    return _arr;
  }
  return arrQuery;
};


const crDfQuery = option => ({
  method: 'POST',
  body: JSON.stringify({
     query: _checkSeriaCategory(option),
     response: {
        format: "json-stat"
     }
  })
});

export default crDfQuery
