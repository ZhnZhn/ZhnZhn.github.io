"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var getValue = _fnAdapter["default"].getValue,
    crError = _fnAdapter["default"].crError;
var C = {
  ROOT: 'https://api.beta.ons.gov.uk/',
  TRADE: 'v1/datasets/trade/editions/time-series/versions/21/observations',
  QUERY_TAIL: 'time=*&geography=K02000001',
  ERR_CAPTION: 'Server Response',
  MSG_EMPTY: 'Dataset is empty'
};
var _isArr = Array.isArray;

var _crErr = crError.bind(null, C.ERR_CAPTION, C.MSG_EMPTY);

var OnsApi = {
  getRequestUrl: function getRequestUrl(option) {
    var items = option.items,
        v1 = getValue(items[0]),
        v2 = getValue(items[1]),
        v3 = getValue(items[2]);
    return "" + C.ROOT + C.TRADE + "?country=" + v1 + "&commodity=" + v2 + "&direction=" + v3 + "&" + C.QUERY_TAIL;
  },
  checkResponse: function checkResponse(json) {
    if (!(json && _isArr(json.observations))) {
      throw _crErr();
    }

    return true;
  }
};
var _default = OnsApi;
exports["default"] = _default;
//# sourceMappingURL=OnsApi.js.map