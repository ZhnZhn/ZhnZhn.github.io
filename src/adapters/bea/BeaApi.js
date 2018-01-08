
const C = {
  URL: 'https://www.bea.gov/api/data/?Year=ALL&ResultFormat=JSON&method=GETDATA&UserID'
};

const BeaApi = {
  getRequestUrl(option){
    const {
            TableID, DataSetName,
            apiKey,
            ValueName, value,
            oneCaption=''
          } = option
        , _Frequncy = oneCaption.indexOf('(A,Q)') === -1
             ? 'A' : 'Q';

    return `${C.URL}=${apiKey}&TableID=${TableID}&DataSetName=${DataSetName}&Frequency=${_Frequncy}&${ValueName}=${value}`;
  },

  checkResponse(json){
    const { BEAAPI={} } = json
        , { Results={} } = BEAAPI;
    if ( Results.Error || !Array.isArray(Results.Data) ) {
      return false;
    }
    return true;
  }

};

export default BeaApi
