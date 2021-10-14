import crDfArrQuery from './crDfArrQuery';

const crDfQuery = option => ({
  method: 'POST',
  body: JSON.stringify({
     query: crDfArrQuery(option),
     response: {
        format: "json-stat"
     }
  })
});

export default crDfQuery
