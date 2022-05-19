"use strict";

exports.__esModule = true;
exports.default = void 0;

var _fnAdapter = require("./fnAdapter");

const API_URL = 'http://fenixservices.fao.org/faostat/api/v1/en/data',
      TAIL = 'area_cs=FAO&item_cs=FAO&show_codes=true&show_unit=true&show_flags=true&null_values=false&output_type=json';

let _mem_year;

const _isArr = Array.isArray,
      _assign = Object.assign,
      _crMemYear = () => {
  const year = new Date().getUTCFullYear(),
        arr = [];
  let i = 1980;

  for (; i < year; i++) {
    arr.push(i);
  }

  return _mem_year = arr.join(',');
},
      _getMemYear = () => _mem_year || _crMemYear();

const _isTitle = qT => qT.indexOf('World') !== -1 && qT.length < 22;

const _checkReq = option => {
  if (option._isTs && (0, _fnAdapter.isSeriesReq)(option)) {
    throw new Error('ERR_10');
  }

  if ((0, _fnAdapter.isQueryAllowed)(option)) {
    throw new Error('Query lists for lists is not allowed.');
  }
};

const FaoStatApi = {
  getRequestUrl(option) {
    _checkReq(option);

    const {
      proxy,
      items,
      dfElement,
      dfDomain = 'QC',
      dfItemName = 'item'
    } = option,
          _one = (0, _fnAdapter.getValue)(items[0]),
          _two = (0, _fnAdapter.getValue)(items[1]),
          _three = (0, _fnAdapter.getValue)(items[2]),
          _element = _three || dfElement,
          _year = _getMemYear();

    return "" + proxy + API_URL + "/" + dfDomain + "?element=" + _element + "&area=" + _one + "&" + dfItemName + "=" + _two + "&year=" + _year + "&" + TAIL;
  },

  checkResponse(json) {
    if (json && _isArr(json.data)) {
      return true;
    }

    throw (0, _fnAdapter.crError)();
  },

  addPropsTo(option) {
    const {
      qA,
      qI,
      qE,
      qT = ''
    } = option,
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
      title
    });
  }

};
var _default = FaoStatApi;
exports.default = _default;
//# sourceMappingURL=FaoStatApi.js.map