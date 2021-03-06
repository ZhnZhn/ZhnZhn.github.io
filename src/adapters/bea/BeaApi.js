
const C = {
  URL: 'https://apps.bea.gov/api/data/?Year=ALL&ResultFormat=JSON&method=GETDATA&UserID',
  DF_ERR_MSG: 'No data exist for selected criteria.'
};

const _isArr = Array.isArray
, _assign = Object.assign;

const _crSubtitle = (title, subtitle) => subtitle
 ? `${title}: ${subtitle}`
 : title;

const _setCaptionTo = option => {
  const { title, subtitle, dfTitle } = option;
  _assign(option, {
    itemCaption: title,
    title: dfTitle,
    subtitle: _crSubtitle(title, subtitle)
  })
};

const _crErr = (errCaption, message) => ({
  errCaption,
  message
});

const BeaApi = {
  getRequestUrl(option){
    const {
      TableID, DataSetName,
      apiKey,
      ValueName,
      items=[],
    } = option
    , value = items[0].value
    , oneCaption = items[0].caption
    , _Frequncy = oneCaption.indexOf('(A,Q)') === -1
         ? 'A' : 'Q';
    _setCaptionTo(option)
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
          || C.DF_ERR_MSG
      );
    }
    if ( Results.Error || !_isArr(Results.Data) ) {
      return _crErr('', C.DF_ERR_MSG);
    }
    return true;
  }

};

export default BeaApi
