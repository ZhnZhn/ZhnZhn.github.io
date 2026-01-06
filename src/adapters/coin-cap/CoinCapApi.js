import {
  isArr,
  parseIntBy10
} from "../../utils/isTypeFn";
import {
  crGetRoute
} from "../../utils/crRouter";

import {
  assign,
  crError,
  getValues,
  setItemCaptionTo,
  ymdToUTC
} from "../AdapterFn";

const API_URL = "https://api.coincap.io/v2";

const _setTitleTo = (
  option,
  title
) => assign(option, {
  title
});

const _crAssetListUrl = (
  option
) => {
  const [
    offset,
    limit
  ] = getValues(option);

  _setTitleTo(option,
    `By USD Market Cap Page: ${offset} (${limit})`
   )
  return `${API_URL}/assets?limit=${limit}&offset=${(parseIntBy10(offset)-1)*(parseIntBy10(limit))}`;
};

const _crExchangeListUrl = (
  option
) => {
  const _pageNumber = parseIntBy10(getValues(option)[0]) || 1;
  option.pageNumber = _pageNumber
  _setTitleTo(option,
    `Exchange List: Page ${_pageNumber}`
  )
  return `${API_URL}/exchanges`;
};

const _crHistoricalMarketUrl = (
  option
) => {
  const [
    id,
    timeframe
  ] = getValues(option)
  , { fromDate } = option
  , _queryPeriod = timeframe === "d1" && fromDate
    ? `&start=${ymdToUTC(fromDate)}&end=${Date.now()}`
    : "";

  setItemCaptionTo(option, `${option.items[0].s}/USD`)
  return `${API_URL}/assets/${id}/history?interval=${timeframe}${_queryPeriod}`;
};

const getCrUrl = crGetRoute({
  MCL: _crAssetListUrl,
  EVL: _crExchangeListUrl,
  HMC: _crHistoricalMarketUrl
});

const CoinCapApi = {
  getRequestUrl(option){
    return getCrUrl(option.dfSubId)(option);
  },

  checkResponse(json){
    if (!isArr((json || {}).data)) {
      throw crError();
    }
  }
};

export default CoinCapApi
