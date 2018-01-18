'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var C = {
  BASE: 'http://fenixservices.fao.org/faostat/api/v1/en/data',
  TAIL: 'area_cs=FAO&item_cs=FAO&show_codes=true&show_unit=true&show_flags=true&null_values=false&output_type=json',
  MEM_YEAR: undefined
};

var _crMemYear = function _crMemYear() {
  var year = new Date().getUTCFullYear(),
      arr = [];
  var i = 1980;
  for (; i < year; i++) {
    arr.push(i);
  }
  return C.MEM_YEAR = arr.join(',');
  //return C.MEM_YEAR;
};
var _getMemYear = function _getMemYear() {
  return C.MEM_YEAR || _crMemYear();
};

var FaoStatApi = {
  getRequestUrl: function getRequestUrl(option) {
    var proxy = option.proxy,
        one = option.one,
        two = option.two,
        three = option.three,
        dfElement = option.dfElement,
        _option$dfDomain = option.dfDomain,
        dfDomain = _option$dfDomain === undefined ? 'QC' : _option$dfDomain,
        _element = three || dfElement,
        _year = _getMemYear();

    return '' + proxy + C.BASE + '/' + dfDomain + '?element=' + _element + '&area=' + one + '&item=' + two + '&year=' + _year + C.TAIL;
  },
  checkResponse: function checkResponse(json) {
    return json && Array.isArray(json.data);
  },
  addPropsTo: function addPropsTo(option) {
    var qA = option.qA,
        qI = option.qI,
        qE = option.qE;

    Object.assign(option, {
      one: qA,
      two: qI,
      three: qE,
      title: 'More about data on tab Info in Description'
    });
  }
};

exports.default = FaoStatApi;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\faostat\FaoStatApi.js.map