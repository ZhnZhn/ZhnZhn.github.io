
const C = {
  ROOT: "https://marketdata.websol.barchart.com/getHistory.jsonp",
  DF_FROM_DATE: '20160627000000',

  REQUEST_ERROR: 'Request Error',
  RESPONSE_EMPTY: 'Dataset Empty'
};

const BarchartApi = {
  getRequestUrl(option) {
    const {
      value,
      fromDate=C.DF_FROM_DATE,
      item={},
      apiKey
    } = option
    , _symbol = value === 'noresult'
       ? (option.value = item.inputValue)
       : value;

    return `${C.ROOT}?key=${apiKey}&symbol=${_symbol}&type=daily&startDate=${fromDate}&dividends=0&splits=0`;
  },

  checkResponse(json){
    if ( !(json && Array.isArray(json.results)) ) {
      throw {
        errCaption: C.REQUEST_ERROR,
        message: C.RESPONSE_EMPTY
      };
    }
    return true;
  }
};

  export default BarchartApi
