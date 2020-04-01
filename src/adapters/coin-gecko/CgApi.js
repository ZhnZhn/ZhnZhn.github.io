import dt from '../../utils/DateUtils'

const C = {
  API_URL: 'https://api.coingecko.com/api/v3',
  PAGE_URL: 'https://www.coingecko.com/en/coins'
};

const _crDays = ({ fromDate }) => {
  const _d = dt.getDaysFromYmd(fromDate);
  return _d > 90 ? _d : 91;
};

const _assignTo = option => {
  const { items } = option
  , [ it1, it2 ] = items
  , { caption, value, s } = it1
  , { value:_currency } = it2
  , _vs = `${s}/${_currency}`
  , _days = _crDays(option);

  Object.assign(option, {
    itemCaption: _vs,
    title: `${caption} (${_vs})`,
    subtitle: 'Values on 00:00 GMT',
    _currency: _currency,
    _nativeUrl: `${C.PAGE_URL}/${value}`,    
    _itemUrl: `${C.API_URL}/coins/${value}/market_chart?vs_currency=${_currency}&days=${_days}`
  })
}

const CgApi = {
  getRequestUrl(option){
    _assignTo(option)
    return option._itemUrl;
  },
  checkResponse(json, option){
    if (json && Array.isArray(json.prices)) {
      return true;
    }
    throw {
      errCaption: "Response Empty",
    };
  }
}

export default CgApi
