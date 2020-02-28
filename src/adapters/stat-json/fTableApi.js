
const _crTidTop = (v) => ({
  code: "Tid",
  selection: {
    filter: "top",
    values: [''+v]
  }
});

const _checkTop = (isTop, strN, arr) => {
  if (isTop) {
    arr.push(_crTidTop(strN))
  }
};

const _crArrQuery = (items) => {
  const arrQuery = [];
  items.forEach(item => {
     const { slice } = item || {};
     for(const propName in slice){
       arrQuery.push({
         code: propName,
         selection: {
           filter: 'item',
           values: [slice[propName]]
           //filter: 'all',
           //values: ['*']
         }
       })
     }
  })
  return arrQuery;
}

const _isCategory = seriaType =>
   seriaType === "BAR_CLUSTER"
|| seriaType === "BAR_SET"
|| seriaType === "COLUMN_SET"
|| seriaType === "COLUMN_CLUSTER"
|| seriaType === "TREE_MAP"
|| seriaType === "TREE_MAP_CLUSTER"
|| seriaType === "TREE_MAP_2"
|| seriaType === "TREE_MAP_2_CLUSTER";

const _checkSeriaCategory = (arr, { dfC, seriaType }) => {
  if (dfC && _isCategory(seriaType)) {
    const _arr = arr.filter(item => item.code !== dfC);
    _arr.unshift({
      code: dfC,
      selection: {
       filter: "all",
       values: ["*"]
     }
    })
    return _arr;
  }
  return arr;
};

const fTableApi = (ROOT_URL) => ({
  getRequestUrl(option){
    const { proxy='', metric, dfId, url } = option
    , id = dfId || metric;
    if (url) { return url; }
    return (option.url = `${proxy}${ROOT_URL}/${id}`);
  },

  crOptionFetch(option){
    const {
      items=[],
      isTop12, isTop6,
      optionFetch
    } = option;

    if (optionFetch) { return optionFetch; }

    const arrQuery = _crArrQuery(items);

    _checkTop(isTop12, '12', arrQuery)
    _checkTop(isTop6, '6', arrQuery)

    return (option.optionFetch = {
      method: 'POST',
      body: JSON.stringify({
         query: _checkSeriaCategory(arrQuery, option),
         response: {
            format: "json-stat"
         }
      })
    });
  },

  checkResponse(){
    return true;
  }
});

export default fTableApi
