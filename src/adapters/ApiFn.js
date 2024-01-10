import {
  isArr,
  crError
} from './AdapterFn';

const _isStr = v => typeof v === "string"

export const crAllOriginsUrl = (
  proxyServer,
  url
) => proxyServer
  ? `${proxyServer}${url}`
  : `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`

const FN_IDENTITY = v => v;
const _getBlockchainData = (
  json,
  getData=FN_IDENTITY
) => getData(json && _isStr(json.contents)
  ? JSON.parse(json.contents)
  : json
);

const _fCheckResponse = (getData) => (
  json,
  option
) => {
  try {
    const _data = _getBlockchainData(json, getData);
    if (isArr(_data)
      || (_data && isArr(_data.asks) && isArr(_data.bids))) {
      return _data;
    }
    throw crError();
  } catch(err) {
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

export const fRouteApi = (
  rCrUrl,
  getData
) => ({
  getRequestUrl: fGetRequestUrl(rCrUrl),
  checkResponse: _fCheckResponse(getData)
})
