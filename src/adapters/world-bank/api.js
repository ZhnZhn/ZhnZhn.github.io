
const C = {
  URL: 'https://api.worldbank.org/v2',
  NATIVE_URL: 'https://data.worldbank.org/indicator'
};

const _addNativeLinkTo = (option) => {
  const { one, two } = option;
  Object.assign(option, {
    linkItem: {
      caption: 'World Bank',
      href: `${C.NATIVE_URL}/${two}?locations=${one}`
    }
  })
};

const api = {
  getRequestUrl(option){
    const { one, two } = option;
    _addNativeLinkTo(option)
    return `${C.URL}/countries/${one}/indicators/${two}?date=1990:2018&format=json`;
  },
  checkResponse(json){
    return Array.isArray(json);
  }
};

export default api
