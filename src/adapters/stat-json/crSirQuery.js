import crDfArrQuery from './crDfArrQuery';

const _trOptionItems = option => {
  option.items = option.items
    .map(item => {
      const { slice } = item || {}
      , _item = {slice: {}};
      for(const propName in slice) {
        _item.slice[propName.toUpperCase()] = slice[propName]
      }
      return _item;
    })
};

const crSirQuery = option => {
  _trOptionItems(option)
  const query = crDfArrQuery(option);
  return {
    method: "POST",
    headers: {
     'Content-Type': "application/json",
    },
    body: JSON.stringify({
      query,
      response: {
        format: "json-stat2",        
        pivot: null
      }
     })
   };
};

export default crSirQuery
