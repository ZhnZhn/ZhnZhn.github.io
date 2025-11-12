"use strict";

exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _AdapterFn = require("../AdapterFn");
const URI = 'https://financialmodelingprep.com/stable';
const _crDataSource = _ref => {
  let {
    dataSource,
    dialogConf
  } = _ref;
  return dataSource || (dialogConf || {}).contFullCaption || '';
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
    _propName = (0, _AdapterFn.getValue)(it2),
    _query = _period ? "&period=" + _period : '',
    _itemUrl = URI + "/" + dfT + "?symbol=" + _symbol + _query;
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
    }),
    _itemUrl = URI + "/" + dfT + "/?symbol=" + _symbol + "&from=" + _fromDate;
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
    _itemUrl = URI + "/" + dfT + "/" + _interval + "?symbol=" + _symbol;
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
    return "" + option._itemUrl + _delimeter + "apikey=" + apiKey;
  },
  checkResponse(json, options) {
    if ((0, _isTypeFn.isArr)(json)) {
      return;
    }
    throw (0, _AdapterFn.crError)(options._symbol, (0, _isTypeFn.isStr)(json) ? json : '');
  }
};
var _default = exports.default = FmpApi;
//# sourceMappingURL=FmpApi.js.map