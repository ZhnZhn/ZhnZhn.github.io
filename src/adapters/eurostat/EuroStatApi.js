
import api from './api/api'

const REQUEST_ERROR = 'Request Error'
    , MESSAGE_HEADER = '400: Bad Request\n'
    , RES_ERR_STATUS = [ 400 ]
    , MSG_400 = '400: Bad request.\nDataset contains no data. One or more filtering elements (query parameters) are probably invalid.\nMaybe try to request this data set with older date or another country.';

const _crDetailMsg = function(label, option){
  const { alertGeo='', alertMetric='' } = option;
  return MESSAGE_HEADER + label + `\n\nIt seems country-dataset doesn't exsist.\n${alertGeo}:${alertMetric}\n\nIf you use For Date input field in Dialog\ntry to use more late date.`;
};

const _crErr = (errCaption, message) => ({
  errCaption,
  message
});

const _addPropTo = (option) => {
  option.resErrStatus = [...RES_ERR_STATUS]
};

const _isRouteUrlN = (items) => Array.isArray(items)
  && items[1]
  && items[1].id;

const EuroStatApi = {

  getRequestUrl(option){
    const { dfParams, items } = option;
    _addPropTo(option)

    return _isRouteUrlN(items)
      ? api.crUrlN(option)
      : dfParams          
          ? api.crUrlWithParams(option)
          : api.crUrl(option);
  },

  checkResponse(json, option, status) {
    if (status === 400) {
      throw _crErr(REQUEST_ERROR, MSG_400);
    }
    const { error } = json;
    if (error){
      const { label } = error;
      if (label) {
        throw _crErr( REQUEST_ERROR, _crDetailMsg(label, option));
      } else {
        throw _crErr( REQUEST_ERROR, '');
      }
    }
    return true;
  }

};

export default EuroStatApi
