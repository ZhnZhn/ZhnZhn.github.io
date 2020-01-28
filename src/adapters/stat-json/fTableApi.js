
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
    } = option
    , arrQuery = [];

    if (optionFetch) { return optionFetch; }

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

    return (option.optionFetch = {
      method: 'POST',
      body: JSON.stringify({
         query: arrQuery,
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
