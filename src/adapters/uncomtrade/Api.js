import { crError } from '../crFn';

const PERIOD = 5
, ALL = 'all'
  //rg=2 Export
  //H4
  //fmt=JSON&head=M
, API_URL = 'https://comtrade.un.org/api/get'
, DF_RG = 2
, DF_MEASURE = 'NetWeight'
, DF_TRADE_PARTNER = '0'

, _isArr = Array.isArray
, _assign = Object.assign;

const _crQuery = freq => `type=C&freq=${freq}&px=HS`;
const _crQueryTail = (
  one,
  tp,
  rg,
  two
) => `r=${one}&p=${tp}&rg=${rg}&cc=${two}`;
const _crMax = (
  one,
  tp
) => one !== ALL && tp === DF_TRADE_PARTNER
  ? 'max=502&'
  : '';

const _crPeriod = (
  toYear,
  period
) => {
  const arr = [];
  for(let i=1; i<=period; i++) {
    arr.push(toYear-i)
  }
  return arr.reverse().join(',');
};

const _isAllPeriod = (
  one,
  tp
) => one !== ALL & tp !== ALL;

let _shortTimePeriod;
const _crTimePeriod = (
  one,
  tp
) => _isAllPeriod(one, tp)
  ? 'ALL,all'
  : _shortTimePeriod
     || (_shortTimePeriod = _crPeriod(
           (new Date()).getUTCFullYear(),
           PERIOD)
        );

const _checkReq = (option) => {
  if (option._isTs) {
    throw new Error('ERR_10');
  }
};

const UnComtradeApi = {
  getRequestUrl(option){
    _checkReq(option)
    const {
      one=ALL,
      two,
      rg=2,
      tp,
      freq
    } = option
    , _query = _crQuery(freq)
    , _tp = tp || DF_TRADE_PARTNER
    , _ps = _crTimePeriod(one, _tp)
    , _queryTail = _crQueryTail(one, _tp, rg, two)
    , _max = _crMax(one, _tp);

    return `${API_URL}?${_max}${_query}&ps=${_ps}&${_queryTail}`;
  },

  checkResponse(json){
    if (json && _isArr(json.dataset)) {
      return true;
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
      _assign(option, {
        one: arr[0],
        two: arr[1]
      })
    }

    _assign(option, { rg, measure })
  }
};

export default UnComtradeApi
