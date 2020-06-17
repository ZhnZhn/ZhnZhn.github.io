import fnAdapter from './fnAdapter'

const {
  getCaption,
  getValue,
  crError,
  getFromDate
} = fnAdapter;

const C = {
  URI: 'https://financialmodelingprep.com/api/v3',
  ERR_EMPTY: 'Response is empty'
};

const _isArr = Array.isArray
const _assign = Object.assign;

const _crDataSource = ({ dataSource, dialogConf={} }) =>
  dataSource || dialogConf.contFullCaption || '';

const _assignDf = option => {
  const { dfT, items=[] } = option
  , [ it1, it2 , it3 ] = items
  , _symbol = getValue(it1, {isUpper: true})
  , _period = getValue(it3)
  , _propName = getCaption(it2)
  , _query = _period
      ? `?period=${_period}`
      : ''
  , _itemUrl = `${C.URI}/${dfT}/${_symbol}${_query}`;

  _assign(option, {
    _symbol,
    _itemUrl, _period,
    _propName,
    itemCaption: _symbol+'_'+_propName,
    dataSource: _crDataSource(option)
  })
};

const _assignHp = option => {
  const {
     dfT, items=[], fromDate
  } = option
  , _fromDate = fromDate || getFromDate(3)
  , _symbol = getValue(items[0], {isUpper: true})
  , _itemUrl = `${C.URI}/${dfT}/${_symbol}?from=${_fromDate}&serietype=line`;

  _assign(option, {
    _symbol,
    _itemUrl,
    _propName: 'close',
    itemCaption: _symbol,
    dataSource: _crDataSource(option)
  })
};

const _rAssign = {
  DF: _assignDf,
  historical: _assignHp
};

const FmpApi = {
  getRequestUrl(option){
    const _assignTo = _rAssign[option.dfPn]
      || _rAssign.DF;
    _assignTo(option)
    const { apiKey } = option;
    return `${option._itemUrl}&apikey=${apiKey}`;
  },

  checkResponse(json, options){
    const { dfPn, _symbol } = options
    , _json = json || {};
    if (_isArr(_json[dfPn]) && _json.symbol === _symbol) {
      return true;
    }
    throw crError(
      _symbol,
      _json.Error || C.ERR_EMPTY
    );
  }
};

export default FmpApi
