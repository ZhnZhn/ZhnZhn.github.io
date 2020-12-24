"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var C = {
  BASE: 'http://fenixservices.fao.org/faostat/api/v1/en/data',
  TAIL: 'area_cs=FAO&item_cs=FAO&show_codes=true&show_unit=true&show_flags=true&null_values=false&output_type=json',
  MEM_YEAR: void 0
};
var isSeriesReq = _fnAdapter["default"].isSeriesReq,
    getValue = _fnAdapter["default"].getValue,
    _isArr = Array.isArray,
    _assign = Object.assign;

var _crMemYear = function _crMemYear() {
  var year = new Date().getUTCFullYear(),
      arr = [];
  var i = 1980;

  for (; i < year; i++) {
    arr.push(i);
  }

  return C.MEM_YEAR = arr.join(',');
};

var _getMemYear = function _getMemYear() {
  return C.MEM_YEAR || _crMemYear();
};

var _isTitle = function _isTitle(qT) {
  return qT.indexOf('World') !== -1 && qT.length < 22;
};

var _checkReq = function _checkReq(option) {
  if (option._isTs && isSeriesReq(option)) {
    throw new Error('ERR_10');
  }
};

var FaoStatApi = {
  getRequestUrl: function getRequestUrl(option) {
    _checkReq(option);

    var proxy = option.proxy,
        items = option.items,
        dfElement = option.dfElement,
        _option$dfDomain = option.dfDomain,
        dfDomain = _option$dfDomain === void 0 ? 'QC' : _option$dfDomain,
        _option$dfItemName = option.dfItemName,
        dfItemName = _option$dfItemName === void 0 ? 'item' : _option$dfItemName,
        _one = getValue(items[0]),
        _two = getValue(items[1]),
        _three = getValue(items[2]),
        _element = _three || dfElement,
        _year = _getMemYear();

    return "" + proxy + C.BASE + "/" + dfDomain + "?element=" + _element + "&area=" + _one + "&" + dfItemName + "=" + _two + "&year=" + _year + "&" + C.TAIL;
  },
  checkResponse: function checkResponse(json) {
    return json && _isArr(json.data);
  },
  addPropsTo: function addPropsTo(option) {
    var qA = option.qA,
        qI = option.qI,
        qE = option.qE,
        _option$qT = option.qT,
        qT = _option$qT === void 0 ? '' : _option$qT,
        title = _isTitle(qT) ? qT : '';

    _assign(option, {
      items: [{
        v: qA
      }, {
        v: qI
      }, {
        v: qE
      }],
      itemCaption: 'Item',
      title: title
    });
  }
};
var _default = FaoStatApi;
exports["default"] = _default;
//# sourceMappingURL=FaoStatApi.js.map