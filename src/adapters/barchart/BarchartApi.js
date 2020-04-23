
const C = {
  ROOT: "https://marketdata.websol.barchart.com/getHistory.jsonp",
  //DF_FROM_DATE: '20190627000000',

  REQUEST_ERROR: 'Request Error',
  RESPONSE_EMPTY: 'Dataset Empty'
};

const _crDfUrl = ({
  value,
  fromDate='',
  apiKey
}) => `${C.ROOT}?key=${apiKey}&symbol=${value}&type=daily&startDate=${fromDate}&dividends=0&splits=0`;

const _crFtUrl = ({
  apiKey,
  value,
  fromDate=''
}) => `${C.ROOT}?key=${apiKey}&symbol=${value}&type=daily&startDate=${fromDate}`;

const _rCrUrl = {
  DF: _crDfUrl,
  FT: _crFtUrl
};

const BarchartApi = {
  getRequestUrl(option) {
    const { dfT } = option
    , _crUrl = _rCrUrl[dfT] || _rCrUrl.DF;
    return _crUrl(option);
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
