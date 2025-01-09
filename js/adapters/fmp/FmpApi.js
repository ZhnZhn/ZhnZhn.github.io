"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
const URI = 'https://financialmodelingprep.com/api/v3';
const _crDataSource = _ref => {
  let {
    dataSource,
    dialogConf
  } = _ref;
  return dataSource || (dialogConf || {}).contFullCaption || '';
};
const REG_BLANKS = /\s/g;
const _toLowerCamelCase = str => str[0].toLowerCase() + str.replace(REG_BLANKS, '').substring(1);
const _crDfPropName = (item, dfT) => {
  const _caption = (0, _AdapterFn.getCaption)(item);
  return dfT !== "ratios" ? _caption : _toLowerCamelCase(_caption);
};
const _assignDf = option => {
  const {
      dfT,
      items = []
    } = option,
    [it1, it2, it3] = items,
    _symbol = (0, _AdapterFn.getValue)(it1, {
      isUpper: true
    }),
    _period = (0, _AdapterFn.getValue)(it3),
    _propName = _crDfPropName(it2, dfT),
    _query = _period ? `period=${_period}` : '',
    _itemUrl = `${URI}/${dfT}/${_symbol}?${_query}`;
  (0, _AdapterFn.assign)(option, {
    _symbol,
    _itemUrl,
    _period,
    _propName,
    itemCaption: _symbol + '_' + _propName,
    dataSource: _crDataSource(option)
  });
};
const _assignHp = option => {
  const {
      dfT,
      items = [],
      fromDate
    } = option,
    _fromDate = fromDate || (0, _AdapterFn.getFromDate)(3),
    _symbol = (0, _AdapterFn.getValue)(items[0], {
      isUpper: true
    })
    //, _itemUrl = `${C.URI}/${dfT}/${_symbol}?from=${_fromDate}&serietype=line`;
    ,
    _itemUrl = `${URI}/${dfT}/${_symbol}?from=${_fromDate}`;
  (0, _AdapterFn.assign)(option, {
    _symbol,
    _itemUrl,
    itemCaption: _symbol,
    dataSource: _crDataSource(option)
  });
};
const _assignCp = option => {
  const {
      dfT,
      items = []
    } = option,
    _symbol = (0, _AdapterFn.getValue)(items[0], {
      isUpper: true
    }),
    _interval = (0, _AdapterFn.getValue)(items[1]),
    _itemUrl = `${URI}/${dfT}/${_interval}/${_symbol}`;
  (0, _AdapterFn.assign)(option, {
    _symbol,
    _itemUrl,
    itemCaption: _symbol,
    dataSource: _crDataSource(option)
  });
};
const _rAssign = {
  DF: _assignDf,
  historical: _assignHp,
  intraday: _assignCp
};
const FmpApi = {
  getRequestUrl(option) {
    const _assignTo = _rAssign[option.dfPn] || _rAssign.DF;
    _assignTo(option);
    const {
        apiKey
      } = option,
      _delimeter = option._itemUrl.indexOf('?') === -1 ? '?' : '&';
    option.apiKey = null;
    return `${option._itemUrl}${_delimeter}apikey=${apiKey}`;
  },
  checkResponse(json, options) {
    const {
        dfPn,
        _symbol
      } = options,
      _json = json || {};
    if (!dfPn && (0, _AdapterFn.isArr)(json) && _json[0].symbol === _symbol || dfPn === 'intraday' && (0, _AdapterFn.isArr)(_json) || (0, _AdapterFn.isArr)(_json[dfPn]) && _json.symbol === _symbol) {
      return;
    }
    throw (0, _AdapterFn.crError)(_symbol, _json.Error);
  }
};
var _default = exports.default = FmpApi;
//# sourceMappingURL=FmpApi.js.map