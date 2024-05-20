import crDfArrQuery from './crDfArrQuery';

const _trOptionItems = option => {
  option.items = option.items
    .map(item => {
      const { caption, slice } = item || {}
      , _item = {caption, slice: {}};
      for(const propName in slice) {
        _item.slice[propName.toUpperCase()] = slice[propName]
      }
      return _item;
    })
};

const _trOptionDfC = option => {
  if (option.dfC) {
    option.dfC = option.dfC.toUpperCase()
  }
};

const crSirQuery = option => {
  _trOptionItems(option)
  _trOptionDfC(option)
  const query = crDfArrQuery(option);
  return {
    method: "POST",
    headers: {
     'Content-Type': "text/plain; charset=UTF-8",
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
