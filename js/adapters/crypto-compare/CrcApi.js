"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var getValue = _fnAdapter["default"].getValue;
var C = {
  URL: 'https://min-api.cryptocompare.com/',
  HD: 'data/histoday',
  REQUEST_ERROR: 'Request Error',
  RESPONSE_EMPTY: 'Response Empty',
  DF_ID: 'BTC'
};

var _getValue = function _getValue(items) {
  if (items === void 0) {
    items = [];
  }

  return getValue(items[0], {
    dfValue: C.DF_ID
  });
};

var _hdUrl = function _hdUrl(option) {
  var value = _getValue(option.items);

  option.value = value;
  return "" + C.URL + C.HD + "?fsym=" + value + "&tsym=USD&limit=600";
};

var _rUrl = {
  DF: _hdUrl,
  HD: _hdUrl
};
var CrcApi = {
  getRequestUrl: function getRequestUrl(option) {
    var dfSubLoadId = option.dfSubLoadId,
        _crUrl = _rUrl[dfSubLoadId] || _rUrl.DF;

    return _crUrl(option);
  },
  checkResponse: function checkResponse(json) {
    if (!(json && json.Response !== 'Error')) {
      throw {
        errCaption: C.REQUEST_ERROR,
        message: json ? json.Message || '' : C.RESPONSE_EMPTY
      };
    }

    return true;
  }
};
var _default = CrcApi;
exports["default"] = _default;
//# sourceMappingURL=CrcApi.js.map