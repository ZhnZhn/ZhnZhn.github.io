"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var getCaption = _fnAdapter["default"].getCaption,
    getValue = _fnAdapter["default"].getValue,
    crError = _fnAdapter["default"].crError,
    getFromDate = _fnAdapter["default"].getFromDate;
var C = {
  URI: 'https://financialmodelingprep.com/api/v3'
};
var _isArr = Array.isArray;
var _assign = Object.assign;

var _crDataSource = function _crDataSource(_ref) {
  var dataSource = _ref.dataSource,
      _ref$dialogConf = _ref.dialogConf,
      dialogConf = _ref$dialogConf === void 0 ? {} : _ref$dialogConf;
  return dataSource || dialogConf.contFullCaption || '';
};

var REG_BLANKS = /\s/g;

var _toLowerCamelCase = function _toLowerCamelCase(str) {
  return str[0].toLowerCase() + str.replace(REG_BLANKS, '').substring(1);
};

var _crDfPropName = function _crDfPropName(item, dfT) {
  var _caption = getCaption(item);

  return dfT !== "ratios" ? _caption : _toLowerCamelCase(_caption);
};

var _assignDf = function _assignDf(option) {
  var dfT = option.dfT,
      _option$items = option.items,
      items = _option$items === void 0 ? [] : _option$items,
      it1 = items[0],
      it2 = items[1],
      it3 = items[2],
      _symbol = getValue(it1, {
    isUpper: true
  }),
      _period = getValue(it3),
      _propName = _crDfPropName(it2, dfT),
      _query = _period ? "period=" + _period : '',
      _itemUrl = C.URI + "/" + dfT + "/" + _symbol + "?" + _query;

  _assign(option, {
    _symbol: _symbol,
    _itemUrl: _itemUrl,
    _period: _period,
    _propName: _propName,
    itemCaption: _symbol + '_' + _propName,
    dataSource: _crDataSource(option)
  });
};

var _assignHp = function _assignHp(option) {
  var dfT = option.dfT,
      _option$items2 = option.items,
      items = _option$items2 === void 0 ? [] : _option$items2,
      fromDate = option.fromDate,
      _fromDate = fromDate || getFromDate(3),
      _symbol = getValue(items[0], {
    isUpper: true
  }),
      _itemUrl = C.URI + "/" + dfT + "/" + _symbol + "?from=" + _fromDate;

  _assign(option, {
    _symbol: _symbol,
    _itemUrl: _itemUrl,
    _propName: 'close',
    itemCaption: _symbol,
    dataSource: _crDataSource(option)
  });
};

var _assignCp = function _assignCp(option) {
  var dfT = option.dfT,
      _option$items3 = option.items,
      items = _option$items3 === void 0 ? [] : _option$items3,
      _symbol = getValue(items[0], {
    isUpper: true
  }),
      _interval = getValue(items[1]),
      _itemUrl = C.URI + "/" + dfT + "/" + _interval + "/" + _symbol;

  _assign(option, {
    _symbol: _symbol,
    _itemUrl: _itemUrl,
    _propName: 'close',
    itemCaption: _symbol,
    dataSource: _crDataSource(option)
  });
};

var _rAssign = {
  DF: _assignDf,
  historical: _assignHp,
  intraday: _assignCp
};
var FmpApi = {
  getRequestUrl: function getRequestUrl(option) {
    var _assignTo = _rAssign[option.dfPn] || _rAssign.DF;

    _assignTo(option);

    var apiKey = option.apiKey,
        _delimeter = option._itemUrl.indexOf('?') === -1 ? '?' : '&';

    return "" + option._itemUrl + _delimeter + "apikey=" + apiKey;
  },
  checkResponse: function checkResponse(json, options) {
    var dfPn = options.dfPn,
        _symbol = options._symbol,
        _json = json || {};

    if (!dfPn && _isArr(json) && _json[0].symbol === _symbol || dfPn === 'intraday' && _isArr(_json) || _isArr(_json[dfPn]) && _json.symbol === _symbol) {
      return true;
    }

    throw crError(_symbol, _json.Error);
  }
};
var _default = FmpApi;
exports["default"] = _default;
//# sourceMappingURL=FmpApi.js.map