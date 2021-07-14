import AdapterFn from '../AdapterFn';

const C = {
  URL: 'https://apps.bea.gov/api/data/?Year=ALL&ResultFormat=JSON&method=GETDATA&UserID'
};

const _isArr = Array.isArray
, _assign = Object.assign
, { crError } = AdapterFn;

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
    const { BEAAPI } = json
    , { Results={}, Error:ResError } = BEAAPI || {};
    if (ResError) {
      const { ErrorDetail } = ResError;
      throw crError(
        ResError.APIErrorCode,
        ErrorDetail.Description
          || ResError.APIErrorDescription
      );
    }
    if ( Results.Error || !_isArr(Results.Data) ) {
      return crError();
    }
    return true;
  }

};

export default BeaApi
