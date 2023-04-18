import {
  isArr,
  assign,
  crError
} from '../AdapterFn';

const ALL = 'all'
, API_URL_2 = 'https://comtradeapi.un.org/public/v1/preview/C'
, DF_RG = 'X'
, DF_MEASURE = 'primaryValue';

const _checkReq = (option) => {
  if (option._isTs) {
    throw new Error('ERR_10');
  }
};

const _crReporterToTradePartnerQueryTail = (
  tp
) => {
  const _tpCode = tp === ALL
    ? ''
    : tp || '0'
  , _partnerCode = _tpCode
      ? `&partnerCode=${_tpCode}&partner2Code=${_tpCode}`
      : '';
  return  _partnerCode
    ? _partnerCode
    : '&period=2022,2021,2020,2019,2018';
};

const UnComtradeApi = {
  getRequestUrl(option){
    _checkReq(option)
    const {
      one=ALL,
      two,
      rg=DF_RG,
      tp,
      freq,
      period,
      proxy
    } = option;

    if (two === 'TOTAL') {
      return `${proxy}${API_URL_2}/A/HS?motCode=0&cmdCode=TOTAL&reporterCode=${one}&flowCode=${rg}&period=${period}`
    }
    if (two === 'AG2') {
      return `${proxy}${API_URL_2}/A/HS?motCode=0&cmdCode=AG2&reporterCode=${one}&flowCode=${rg}&partnerCode=0&partner2Code=0&period=${period}`
    }

    // All Reporter to TradePartner (Default TradePartner: World)
    if (one === ALL) {
      const _tpCode = tp === ALL
        ? '0'
        : tp || '0';
      return `${proxy}${API_URL_2}/${freq}/HS?motCode=0&cmdCode=${two}&flowCode=${rg}&partnerCode=${_tpCode}&partner2Code=${_tpCode}`;
    }

    // Reporter to TradePartner (Default TradePartner: All)
    const _queryTail = _crReporterToTradePartnerQueryTail(tp);
    return `${proxy}${API_URL_2}/${freq}/HS?motCode=0&cmdCode=${two}&reporterCode=${one}&flowCode=${rg}${_queryTail}`;
  },

  checkResponse(json){
    if (json) {
      json.dataset = json.data
      if (isArr(json.dataset)) {
        return true;
      }
    }
    throw crError();
  },

  addPropsTo(option){
    const {
      one,
      v,
      rg=DF_RG,
      measure=DF_MEASURE
    } = option;

    if (!one) {
      const arr = v.substring(3).split('_')
      assign(option, {
        one: arr[0],
        two: arr[1]
      })
    }

    assign(option, { rg, measure })
  }
};

export default UnComtradeApi
