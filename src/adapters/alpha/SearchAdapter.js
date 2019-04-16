
const C = {
  URL: 'https://www.alphavantage.co/query/search',
  FN_SEARCH: 'function=SYMBOL_SEARCH'
};

const SearchAdapter = {
  crUrl: (value, { apiKey='' }) => `${C.URL}?${C.FN_SEARCH}&keywords=${value}&apikey=${apiKey}`,
  crOptions: json => {
    if (!json || !Array.isArray(json.bestMatches)) {
      throw new Error('Response format is not valid');
    }
    return json.bestMatches.map(item => ({
      value: item['1. symbol'],
      name: item['2. name'],
      type: item['3. type'],
      region: item['4. region'],
      currency: item['8. currency']
    }))
  }
};

export default SearchAdapter
