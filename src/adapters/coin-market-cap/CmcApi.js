
const C = {
  URL: "https://api.coinmarketcap.com/v1/ticker/"
};

const CrcApi = {
  getRequestUrl(option){
    const { one, two } = option;
    return `${C.URL}?start=${one}&limit=${two}`;
  },
  checkResponse(json){
    if (!Array.isArray(json)) {
      return false;
    }
    return true;  
  }
}

export default CrcApi
