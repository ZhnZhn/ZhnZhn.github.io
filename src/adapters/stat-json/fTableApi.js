
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

const fTableApi = (ROOT_URL) => ({
  getRequestUrl(option){
    const { proxy='', metric, dfId } = option
    , id = dfId || metric;
    return `${proxy}${ROOT_URL}/${id}`;
  },

  crOptionFetch(option){
    const { items=[], isTop12, isTop6 } = option
        , arrQuery = [];
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

    _checkTop(isTop12, '12', arrQuery)
    _checkTop(isTop6, '6', arrQuery)

    return {
      method: 'POST',
      body: JSON.stringify({
         query: arrQuery,
         response: {
            format: "json-stat"
         }
      })
    };
  },

  checkResponse(){
    return true;
  }
});

export default fTableApi
