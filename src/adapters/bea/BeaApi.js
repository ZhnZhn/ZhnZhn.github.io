import { joinByColon } from '../../utils/arrFn';

import {
  isArr,
  assign,
  getValue,
  crError
} from '../AdapterFn';
import {
  BEA_DATA_URL,
  getFrequency,
  getResError,
  getResults,
  getResultsData
} from './fnAdapter';

const API_URL = `${BEA_DATA_URL}/api/data/?Year=ALL&ResultFormat=JSON&method=GETDATA&UserID`;

const _setCaptionTo = option => {
  const {
    title,
    subtitle,
    dfTitle
  } = option;
  assign(option, {
    itemCaption: title,
    title: dfTitle,
    subtitle: joinByColon(title, subtitle)
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
    , value = getValue(items[0])
    , _Frequncy = getFrequency(items[0])
    _setCaptionTo(option)
    return `${API_URL}=${apiKey}&TableID=${TableID}&DataSetName=${DataSetName}&Frequency=${_Frequncy}&${ValueName}=${value}`;
  },

  checkResponse(json){
    const ResError = getResError(json);
    if (ResError) {
      throw crError(
        ResError.APIErrorCode,
        (ResError.ErrorDetail || {}).Description
          || ResError.APIErrorDescription
      );
    }

    const Results = getResults(json);
    if ( !Results || Results.Error || !isArr(getResultsData(Results)) ) {
      throw crError();
    }
  }

};

export default BeaApi
