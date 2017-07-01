
const C = {
  //ROOT: "https://crossorigin.me/https://marketdata.websol.barchart.com/getHistory.json"
  ROOT: "https://marketdata.websol.barchart.com/getHistory.jsonp"
}

const BarchartApi = {
  getRequestUrl(option) {
    const {
            value, fromDate='20160627000000',
            //toDate,
            apiKey
          } = option;

    return `${C.ROOT}?key=${apiKey}&symbol=${value}&type=daily&startDate=${fromDate}&dividends=0&splits=0`;
  },

  checkResponse(json){
    return true;
  }
};

  export default BarchartApi
