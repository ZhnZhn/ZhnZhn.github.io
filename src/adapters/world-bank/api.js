
const C = {
  URL: 'https://api.worldbank.org/v2'
};

const api = {
  getRequestUrl(option){
    const { one, two } = option;
    return `${C.URL}/countries/${one}/indicators/${two}?date=1990:2017&format=json`;
  },
  checkResponse(json){
    return Array.isArray(json);
  }
};

export default api
