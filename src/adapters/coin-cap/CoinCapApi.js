import {
  isArr,
  assign,
  crError,
  getValue,
  crGetRoute
} from "../AdapterFn";

const API_URL = "https://api.coincap.io/v2";

const _setTitleTo = (
  option,
  title
) => assign(option, {
  title
});

const _getOneTwoItemValues = (
  option
) => [
  getValue(option.items[0]),
  getValue(option.items[1])
];

const _crAssetListUrl = (
  option
) => {
  const [
    offset,
    limit
  ] = _getOneTwoItemValues(option);

  _setTitleTo(option,
    `By USD Market Cap Page: ${offset} (${limit})`
   )
  return `${API_URL}/assets?limit=${limit}&offset=${(parseInt(offset)-1)*(parseInt(limit))}`;
};

const _crHistoricalMarketUrl = (
  option
) => {
  const [
    id,
    timeframe
  ] = _getOneTwoItemValues(option);

  option.itemCaption = `${option.items[0].s}/USD`
  return `${API_URL}/assets/${id}/history?interval=${timeframe}`;
};

const getCrUrl = crGetRoute({
  MCL: _crAssetListUrl,
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
