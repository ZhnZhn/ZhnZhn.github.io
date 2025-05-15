import {
  isArr,
  assign,
  crError,
  getDaysFromYmd,
  getCaption,
  getValues
} from '../AdapterFn';
import { crPageConfig } from './fnAdapter';

const API_URL = 'https://api.coingecko.com/api/v3'
, COINS_API_URL = API_URL + "/coins"
, EXCHANGES_API_URL = API_URL + "/exchanges"
, PAGE_URL = 'https://www.coingecko.com/en/coins';

const _setTitleAndItemUrlTo = (
  option,
  title,
  _itemUrl
) => assign(option, {
  title,
  _itemUrl
});

const _assignDf = option => {
  const [
    item1,
    item2
  ] = option.items
  , { c, v:value, s } = item1
  , { v:_currency } = item2
  , _vs = `${s}/${_currency}`
  , _days = Math.min(Math.max(
      getDaysFromYmd(option.fromDate),
      91
  ), 365);

  assign(option, {
    itemCaption: _vs,
    subtitle: 'Values on 00:00 GMT',
    _currency: _currency,
    _nativeUrl: `${PAGE_URL}/${value}`,
  })
  _setTitleAndItemUrlTo(option,
     c,
     `${COINS_API_URL}/${value}/market_chart?vs_currency=${_currency}&days=${_days}`
  )
};

const _assignMcl = option => {
  const [
    page,
    perPage,
    currency
  ] = crPageConfig(option);

  _setTitleAndItemUrlTo(option,
    `By Market Cap Page: ${page} (${perPage})`,
    `${COINS_API_URL}/markets?order=market_cap_desc&page=${page}&per_page=${perPage}&vs_currency=${currency}&price_change_percentage=1h,7d,30d,1y`
  )
};

const _assignEl = option => {
  const [
    page,
    perPage
  ] = crPageConfig(option);

  _setTitleAndItemUrlTo(option,
    `By Exchages Page: ${page} (${perPage})`,
    `${EXCHANGES_API_URL}?page=${page}&per_page=${perPage}`
  )
};

const _assignEv = option => {
  const [
    exchange,
    days
  ] = getValues(option);

  _setTitleAndItemUrlTo(option,
    `${getCaption(option.items[0])} historical trading volume in BTC`,
    `${EXCHANGES_API_URL}/${exchange}/volume_chart?days=${days}`
  )
};

const _rAssign = {
  DF: _assignDf,
  MCL: _assignMcl,
  EL: _assignEl,
  EV: _assignEv
};

const CgApi = {
  getRequestUrl(option){
    (_rAssign[option.dfSubId] || _rAssign.DF)(option)
    return option._itemUrl;
  },

  checkResponse(json, option){
    const { dfSubId } = option;
    if ( (dfSubId === 'MCL' || dfSubId === 'EL' || dfSubId === 'EV')
        && isArr(json)
        && json.length > 1) {
      return json;
    }
    if (json && isArr(json.prices)) {
      return json;
    }
    throw crError();
  }
};

export default CgApi
