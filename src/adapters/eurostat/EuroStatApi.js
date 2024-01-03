import { crError } from '../AdapterFn';
import api from './api/api';

const RES_ERR_STATUS = [400]
, MSG_400 = '400: Bad request.\nDataset contains no data. One or more filtering elements (query parameters) are probably not valid.\nMaybe try to request this data set with older date or another country.'

, _crDetailMsg = errLabel =>
    `${errLabel}\n\nIf you use For Date input field in Dialog\ntry to use more late date.`
, _addPropTo = option => {
  option.resErrStatus = [...RES_ERR_STATUS]
};

const EuroStatApi = {

  getRequestUrl(option){
    _addPropTo(option)
    if (option.url) {
      return option.url;
    }
    const _url = api.crUrlN(option);
    return (option.url = _url);
  },

  checkResponse(json, option, status) {
    if (status === 400) {
      throw crError('', MSG_400);
    }
    const { error } = json;
    if (error){
      const { label } = error
      , _msgErr = label
          ? _crDetailMsg(label)
          : void 0
      throw crError('', _msgErr);
    }
  }

};

export default EuroStatApi
