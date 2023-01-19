import { 
  isArr,
  assign,
  crError,
  getDaysFromYmd
} from '../AdapterFn';
import { crPageConfig } from './fnAdapter';

const API_URL = 'https://api.coingecko.com/api/v3'
, PAGE_URL = 'https://www.coingecko.com/en/coins';

const _crDays = ({
  fromDate
}) => {
  const _d = getDaysFromYmd(fromDate);
  return _d > 90 ? _d : 91;
};

const _assignDf = option => {
  const { items } = option
  , [ it1, it2 ] = items
  , { c, v:value, s } = it1
  , { v:_currency } = it2
  , _vs = `${s}/${_currency}`
  , _days = _crDays(option);

  assign(option, {
    itemCaption: _vs,
    title: c,
    subtitle: 'Values on 00:00 GMT',
    _currency: _currency,
    _nativeUrl: `${PAGE_URL}/${value}`,
    _itemUrl: `${API_URL}/coins/${value}/market_chart?vs_currency=${_currency}&days=${_days}`
  })
}

const _assignMcl = option => {
  const [
    page,
    perPage,
    currency
  ] = crPageConfig(option);

  assign(option, {
    title: `By Market Cap Page: ${page} (${perPage})`,
    _itemUrl: `${API_URL}/coins/markets?order=market_cap_desc&page=${page}&per_page=${perPage}&vs_currency=${currency}&price_change_percentage=1h,7d,30d,1y`
  })
}

const _assignEl = option => {
  const [
    page, perPage
  ] = crPageConfig(option);

  assign(option, {
    title: `By Exchages Page: ${page} (${perPage})`,
    _itemUrl: `${API_URL}/exchanges?page=${page}&per_page=${perPage}`
  })
}

const _rAssign = {
  DF: _assignDf,
  MCL: _assignMcl,
  EL: _assignEl
}

const CgApi = {
  getRequestUrl(option){
    const { dfSubId } = option
    , _assignTo = _rAssign[dfSubId] || _rAssign.DF;
    _assignTo(option)
    return option._itemUrl;
  },
  checkResponse(json, option){
    const { dfSubId } = option
    if ( (dfSubId === 'MCL' || dfSubId === 'EL')
        && isArr(json)
        && json.length > 1) {
      return true;
    }
    if (json && isArr(json.prices)) {
      return true;
    }
    throw crError();
  }
}

export default CgApi
