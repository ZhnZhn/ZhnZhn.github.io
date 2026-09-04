import {
  LT_BN,
  LT_BG,
  LT_BT,
  LT_CB
} from '../constants/LoadType';
import {
  isArr,
  isStr
} from '../utils/isTypeFn';
import { isInArrStr } from '../utils/arrFn';
import { getValue } from '../utils/itemFn';

import {
  FN_IDENTITY,
  crError,
  fCheckResponse
} from './AdapterFn';

export const crProviderApi = (
  getRequestUrl,
  checkResponse = fCheckResponse()
) => ({
  getRequestUrl: option => {
    const url = getRequestUrl(option);
    option.apiKey = void 0;
    return url;
  },
  checkResponse
})

export const checkResponseIsStr = (str) => {
  if (!isStr(str)) {
    throw crError();
  }
}

const _fAddFnTo = (
  propName
) => (
  api,
  fn
) => {
  api[propName] = fn
  return api;
}

//NdlApi
export const addGetLimitRemainingTo = _fAddFnTo("getLimitRemaining")
//stat-json fTableApi, IntrinioApi
export const addCrOptionFetchTo = _fAddFnTo("crOptionFetch")

const _isWithCORS = isInArrStr([
  LT_BN,
  LT_BG,
  LT_BT,
  LT_CB
]);

const _crAllOriginsUrl = (
  url,
  { proxy, loadId }
) => _isWithCORS(loadId)
  ? url
  : proxy
     ? `${proxy}${url}`
     : `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`

export const fCrDfUrl = (crDfUrl) => (
  option
) => {
  const { items=[] } = option
  , timeframe = getValue(items[1]);
  option.timeframe = timeframe
  return _crAllOriginsUrl(
    crDfUrl(getValue(items[0]), timeframe, getValue(items[2]), option, items),
    option
  );
}

export const fCrObUrl = crObUrl => (
  option
) => {
  const { items=[] } = option;
  return _crAllOriginsUrl(
    crObUrl(getValue(items[0]), getValue(items[1])),
    option
  );
}

const _getBlockchainData = (
  json,
  option,
  getData=FN_IDENTITY
) => getData(
  json && isStr(json.contents)
    ? JSON.parse(json.contents)
    : json,
  option
);

const _fCheckResponse = (getData) => (
  json,
  option
) => {
  try {
    const _data = _getBlockchainData(json, option, getData);
    if (isArr(_data)
      || (_data && isArr(_data.asks) && isArr(_data.bids))) {
      return _data;
    }
    throw crError();
  } catch {
    throw crError();
  }
}

export const fGetRequestUrl = (
  rCrUrl
) => (option) => {
  const { dfSubId } = option
  , _crUrl = dfSubId && rCrUrl[dfSubId]
      || rCrUrl.DF;
  return _crUrl(option);
}

const _crRouteApi = (
  rCrUrl,
  getData
) => crProviderApi(
  fGetRequestUrl(rCrUrl),
  _fCheckResponse(getData)
);

export const crRouteDfObApi = (
  crDfUrl,
  crObUrl,
  getData
) => _crRouteApi({
  DF: fCrDfUrl(crDfUrl),
  OB: crObUrl ? fCrObUrl(crObUrl) : void 0
}, getData)
