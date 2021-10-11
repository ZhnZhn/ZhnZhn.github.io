import crArrQuery from './crArrQuery';

const crSirQuery = option => ({
  method: "POST",
  headers: {
   'Content-Type': "application/json",
  },
  body: JSON.stringify({
    query: crArrQuery(option.items, true),
    response: {
      format: "json-stat2",
      pivot: null
    }
  })
});

export default crSirQuery
