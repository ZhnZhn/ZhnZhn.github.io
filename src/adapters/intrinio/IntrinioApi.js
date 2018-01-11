
const C = {
  URL: 'https://api.intrinio.com/historical_data',
  TAIL: 'item=level'
};

const FRQ = {
  A: 'yearly',
  Q: 'quarterly',
  W: 'weekly',
  D: 'daily',
  M: 'monthly',
  DF: 'monthly'
};

const IntrinioApi = {
  crOptionFetch(option){
    const { apiKey } = option;
    return {
      headers: {
        'X-Authorization-Public-Key': apiKey
      }
    };
  },

  getRequestUrl(option){
    const {
             value, fromDate, toDate, item={},
             one, two
           } = option;

    if (two) {
      return `${C.URL}?identifier=${one}&item=${two}&start_date=${fromDate}&end_date=${toDate}&frequency=quarterly`;
    }

    const _frq = FRQ[item.frq] || FRQ.DF;
    return `${C.URL}?identifier=${value}&start_date=${fromDate}&end_date=${toDate}&frequency=${_frq}&${C.TAIL}`;
  },

  checkResponse(json){
    return json
      && json.data
      && Array.isArray(json.data);          
  }
};

export default IntrinioApi
