import {
  isArr,
  assign,
  joinBy,
  crError
} from '../AdapterFn';

const URL = 'https://apps.bea.gov/api/data/?Year=ALL&ResultFormat=JSON&method=GETDATA&UserID';

const _setCaptionTo = option => {
  const {
    title,
    subtitle,
    dfTitle
  } = option;
  assign(option, {
    itemCaption: title,
    title: dfTitle,
    subtitle: joinBy(':', title, subtitle)
  })
};

const BeaApi = {
  getRequestUrl(option){
    const {
      TableID,
      DataSetName,
      apiKey,
      ValueName,
      items=[],
    } = option
    , value = items[0].value
    , oneCaption = items[0].caption
    , _Frequncy = oneCaption.indexOf('(A,Q)') === -1
         ? 'A' : 'Q';
    _setCaptionTo(option)
    return `${URL}=${apiKey}&TableID=${TableID}&DataSetName=${DataSetName}&Frequency=${_Frequncy}&${ValueName}=${value}`;
  },

  checkResponse(json){
    const { BEAAPI } = json
    , {
      Results={},
      Error:ResError
    } = BEAAPI || {};
    if (ResError) {
      const { ErrorDetail } = ResError;
      throw crError(
        ResError.APIErrorCode,
        ErrorDetail.Description
          || ResError.APIErrorDescription
      );
    }
    if (Results.Error || !isArr(Results.Data)) {
      return crError();
    }
  }

};

export default BeaApi
