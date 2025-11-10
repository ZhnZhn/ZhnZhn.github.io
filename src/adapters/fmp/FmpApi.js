import {
  isArr,
  isStr
} from '../../utils/isTypeFn';

import {
  assign,
  getCaption,
  getValue,
  crError,
  getFromDate
} from '../AdapterFn';

const URI = 'https://financialmodelingprep.com/stable';

const _crDataSource = ({
  dataSource,
  dialogConf
}) => dataSource
 || (dialogConf || {}).contFullCaption || '';

const REG_BLANKS = /\s/g;
const _toLowerCamelCase = str => str[0].toLowerCase()
  + str.replace(REG_BLANKS,'').substring(1);

const _crDfPropName = (item, dfT) => {
  const _caption = getCaption(item);
  return dfT !== "ratios"
    ? _caption
    : _toLowerCamelCase(_caption);
};

const _assignDf = option => {
  const { dfT, items=[] } = option
  , [ it1, it2 , it3 ] = items
  , _symbol = getValue(it1, {isUpper: true})
  , _period = getValue(it3)
  , _propName = _crDfPropName(it2, dfT)
  , _query = _period
      ? `&period=${_period}`
      : ''
  , _itemUrl = `${URI}/${dfT}?symbol=${_symbol}${_query}`;

  assign(option, {
    _symbol,
    _itemUrl, _period,
    _propName,
    itemCaption: _symbol+'_'+_propName,
    dataSource: _crDataSource(option)
  })
};

const _assignHp = option => {
  const {
     dfT,
     items=[],
     fromDate
  } = option
  , _fromDate = fromDate || getFromDate(3)
  , _symbol = getValue(items[0], {isUpper: true})
  , _itemUrl = `${URI}/${dfT}/?symbol=${_symbol}&from=${_fromDate}`;

  assign(option, {
    _symbol,
    _itemUrl,
    itemCaption: _symbol,
    dataSource: _crDataSource(option)
  })
};

const _assignCp = option => {
  const {
     dfT,
     items=[]
  } = option
  , _symbol = getValue(items[0], {isUpper: true})
  , _interval = getValue(items[1])
  , _itemUrl = `${URI}/${dfT}/${_interval}?symbol=${_symbol}`;

  assign(option, {
    _symbol,
    _itemUrl,
    itemCaption: _symbol,
    dataSource: _crDataSource(option)
  })
};

const _rAssign = {
  DF: _assignDf,
  historical: _assignHp,
  intraday: _assignCp
};

const FmpApi = {
  getRequestUrl(option){
    const _assignTo = _rAssign[option.dfPn]
      || _rAssign.DF;
    _assignTo(option)

    const { apiKey } = option
    , _delimeter = option._itemUrl.indexOf('?') === -1
         ? '?' : '&';

    option.apiKey = null;
    return `${option._itemUrl}${_delimeter}apikey=${apiKey}`;
  },

  checkResponse(json, options){
    if (isArr(json)) {
       return;
    }
    throw crError(
      options._symbol,
      isStr(json) ? json : ''      
    );
  }
};

export default FmpApi
