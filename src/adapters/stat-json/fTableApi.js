import fnAdapter from './fnAdapter';

import crDfQuery from './crDfQuery';
import crSdnQuery from './crSdnQuery';
import crSirQuery from './crSirQuery';

const { crError } = fnAdapter
, _crErr = crError.bind(null, '');

const _hmCrQuery = {
  DF: crDfQuery,
  SDN: crSdnQuery,
  SIR: crSirQuery
};

const _crDfId = option => option.loadId === 'SDN'
  ? ''
  : '/'+option.dfId;

const fTableApi = (ROOT_URL) => ({
  getRequestUrl(option){
    option.resErrStatus = [400]
    if (option.url) { return option.url; }

    const _dfId = _crDfId(option);
    return (option.url = `${option.proxy || ''}${ROOT_URL}${_dfId}`);
  },

  crOptionFetch(option){
    if (option.optionFetch) {
      return option.optionFetch;
    }
    const _crQuery = _hmCrQuery[option.loadId]
      || _hmCrQuery.DF;
    return (option.optionFetch=_crQuery(option));
  },

  checkResponse(json){
    const { error } = json || {};
    if (error) {
      throw _crErr(error);
    }
    return true;
  }
});

export default fTableApi
