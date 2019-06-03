import fnAdapter from './fnAdapter'

const {
  getCaption,
  getValue,
  crError
} = fnAdapter;

const C = {
  URI: 'https://financialmodelingprep.com/api/v3',
  ERR_EMPTY: 'Response is empty'
};

const _configOption = option => {
  const { dfT, items=[], dataSource, conf={} } = option
  , { chartContainerCaption=''} = conf
  , [ it1, it2 , it3 ] = items
  , _symbol = getValue(it1)
  , _period = getValue(it3)
  , _propName = getCaption(it2)
  , _query = _period
      ? `?period=${_period}`
      : ''
  , _itemUrl = `${C.URI}/${dfT}/${_symbol}${_query}`;

  Object.assign(option, {
    _itemUrl,
    _symbol, _period,
    _propName,
    dataSource: dataSource || chartContainerCaption
  })
}

const FmpApi = {
  getRequestUrl(option){
    _configOption(option)
    return option._itemUrl;
  },
  checkResponse(json, options){
    const { dfPn, _symbol } = options
    , _json = json || {}
    , _values =  _json[dfPn];
    if (Array.isArray(_values)
        && json.symbol === _symbol) {
      json._values = _values
      return true;
    }
    throw crError(
      _symbol,
      json.Error || C.ERR_EMPTY
    );
  }
}

export default FmpApi
