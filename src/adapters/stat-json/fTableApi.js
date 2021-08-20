
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
};

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

const _crOptionFetch = (arrQuery, option) => ({
  method: 'POST',
  body: JSON.stringify({
     query: _checkSeriaCategory(arrQuery, option),
     response: {
        format: "json-stat"
     }
  })
});

const _crVariablesDenm = items => items
 .map(({ slice }) => {
    const code = Object.keys(slice)[0];
    return {
      code,
      values: [slice[code]]
    };
 });

const _crOptionFetchDenm = ({ dfId, items }) => ({
  method: "POST",
  headers: {
   'Content-Type': "application/json",
  },
  body: JSON.stringify({
     lang: "en",
     table: dfId,
     format: "JSONSTAT",
     valuePresentation: "Default",
     timeOrder: "Ascending",
     variables: [
       ..._crVariablesDenm(items),
       { code: 'Tid', values: ["*"]}
     ]
  })
});

const fTableApi = (ROOT_URL) => ({
  getRequestUrl(option){
    if (option.url) { return option.url; }

    const { proxy='', dfId } = option
    , _dfId = option.loadId === 'SDN'
        ? ''
        : '/'+dfId;

    return (option.url = `${proxy}${ROOT_URL}${_dfId}`);
  },

  crOptionFetch(option){
    if (option.optionFetch) {
      return option.optionFetch;
    }
    if (option.loadId === 'SDN') {
      return (option.optionFetch = _crOptionFetchDenm(option));
    }

    const {
      items=[],
      isTop12, isTop6,
    } = option
    , arrQuery = _crArrQuery(items);

    _checkTop(isTop12, '12', arrQuery)
    _checkTop(isTop6, '6', arrQuery)

    return (option.optionFetch = _crOptionFetch(arrQuery, option));
  },

  checkResponse(){
    return true;
  }
});

export default fTableApi
