import {
  isArr,
  isStr
} from '../../utils/isTypeFn';

import {
  assign,
  crError
} from '../AdapterFn';

import { WORLD_CODE } from './conf';
import { isAggregateByHs } from './fnAdapter';

const API_URL = 'https://comtradeapi.un.org/public/v1/preview/C'
, DF_RG = 'X'
, DF_MEASURE = 'primaryValue'
, PARTNER_2_CODE_WORLD_QUERY = "partner2Code=0";

const _checkReq = (option) => {
  if (option._isTs) {
    throw new Error('ERR_10');
  }
};

const _crReporterCodeQuery = (
  reporterCode
) => reporterCode === WORLD_CODE
  ? ''
  : `&reporterCode=${reporterCode}&${PARTNER_2_CODE_WORLD_QUERY}`;

const _crCategoryByPartnerUrl = (
  proxy,
  reporterCode,
  cmdCode,
  flowCode,
  time,
) => `${proxy}${API_URL}/A/HS/?motCode=0&customsCode=C00&cmdCode=${cmdCode}&flowCode=${flowCode}&period=${time}${_crReporterCodeQuery(reporterCode)}`;

const _crAggregateOrWorldPatnerQuery = (
  option,
  one
) => isAggregateByHs(option) || one === WORLD_CODE
  ? `&partnerCode=0&${PARTNER_2_CODE_WORLD_QUERY}`
  : '';

const UnComtradeApi = {
  getRequestUrl(option){
    _checkReq(option)
    const {
      one=WORLD_CODE,
      rg=DF_RG,
    } = option;

    return _crCategoryByPartnerUrl(
      option.proxy,
      one,
      option.two,
      rg,
      option.time
    ) + _crAggregateOrWorldPatnerQuery(option, one);
  },

  checkResponse(json){
    if (json && isArr(json.data)) {
      return json;
    }
    const {
      error,
      message,
      statusCode
    } = json || {}
    if (isStr(error)) {
      throw crError('', error);
    }
    if (isStr(message)) {
      throw crError('',
        statusCode === 429
          ? `${statusCode}: ${message.replace('in 1 seconds', 'in 1 minutes')}`
          : message
      );
    }
    throw crError();
  },

  addPropsTo(option){
    const {
      one=WORLD_CODE,
      v,
      rg=DF_RG,
      measure=DF_MEASURE
    } = option;

    if (!one) {
      const arr = v.slice(3).split('_')
      assign(option, {
        one: arr[0],
        two: arr[1]
      })
    }

    assign(option, { rg, measure })
  }
};

export default UnComtradeApi
