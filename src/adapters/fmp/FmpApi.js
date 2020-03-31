import DateUtils from '../../utils/DateUtils'
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

const DF_FROM_DATE = DateUtils.getFromDate(3);

const _crDataSource = ({ dataSource, dialogConf={} }) =>
  dataSource || dialogConf.chartContainerCaption || '';

const _assignDf = option => {
  const { dfT, items=[] } = option
  , [ it1, it2 , it3 ] = items
  , _symbol = getValue(it1)
  , _period = getValue(it3)
  , _propName = getCaption(it2)
  , _query = _period
      ? `?period=${_period}`
      : ''
  , _itemUrl = `${C.URI}/${dfT}/${_symbol}${_query}`;

  Object.assign(option, {
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
  , _fromDate = fromDate || DF_FROM_DATE
  , [ it1 ] = items
  , _symbol = getValue(it1)
  , _itemUrl = `${C.URI}/${dfT}/${_symbol}?from=${_fromDate}&serietype=line`;

  Object.assign(option, {
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
    return option._itemUrl;
  },

  checkResponse(json, options){
    const { dfPn, _symbol } = options
    , _json = json || {};
    if (Array.isArray(_json[dfPn])
        && _json.symbol === _symbol) {
      return true;
    }
    throw crError(
      _symbol,
      _json.Error || C.ERR_EMPTY
    );
  }
};

export default FmpApi
