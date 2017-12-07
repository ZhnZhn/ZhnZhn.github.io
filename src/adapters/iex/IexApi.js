
const C = {
  BASE_URL: 'https://api.iextrading.com/1.0/stock'
};

const IexApi = {
  getRequestUrl(option){
    const { value } = option;
    return `${C.BASE_URL}/${value}`;
  },

  checkResponse(){
    return true;
  }
}

export default IexApi
