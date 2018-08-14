
const C = {
  //URL: 'https://www.bea.gov/api/data/?Year=ALL&ResultFormat=JSON&method=GETDATA&UserID'
  URL: 'https://apps.bea.gov/api/data/?Year=ALL&ResultFormat=JSON&method=GETDATA&UserID'
};

const DF_ERR_MSG = 'No data exist for selected criteria.';

const _crErr = (errCaption, message) => ({
  errCaption,
  message
});

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
        , { Results={}, Error:ResError } = BEAAPI;
    if (ResError) {
      const { ErrorDetail } = ResError;
      throw _crErr(
        ResError.APIErrorCode || '',
        ErrorDetail.Description
          || ResError.APIErrorDescription
          || DF_ERR_MSG
      );
    }
    if ( Results.Error || !Array.isArray(Results.Data) ) {
      return _crErr('', DF_ERR_MSG);
    }
    return true;
  }

};

export default BeaApi
