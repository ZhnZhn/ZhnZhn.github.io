"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var C = {
  URL: "https://api.eia.gov/category/",
  S_URL: "https://api.eia.gov/series/"
};
var CAPTION = 'EIA';
var MSG = {
  ERR: 'invalid series_id.',
  NOT_EXIST: 'Data for enetered parameters is not existed.',
  EMPTY: 'Response is empty.',
  DATA_EMPTY: 'Data is empty.'
};

var _crErr = function _crErr(caption, message) {
  return {
    errCaption: caption,
    message: message
  };
};

var EiaApi = {
  getRequestUrl: function getRequestUrl(option) {
    var sufix = option.sufix,
        apiKey = option.apiKey,
        _option$items = option.items,
        items = _option$items === undefined ? [] : _option$items,
        _one = items[0] ? items[0].value : '',
        _two = items[1] ? items[1].value : '',
        _three = items[2] ? items[2].value : '',
        _sufix = _three || sufix;

    return C.S_URL + "?api_key=" + apiKey + "&series_id=" + _two + _one + _sufix;
  },
  checkResponse: function checkResponse(json) {
    if (!json) {
      throw _crErr(CAPTION, MSG.EMPTY);
    }
    var _json$data = json.data,
        data = _json$data === undefined ? {} : _json$data,
        msgErr = data.error;

    if (msgErr) {
      if (msgErr.indexOf(MSG.ERR) !== -1) {
        throw _crErr(CAPTION, MSG.NOT_EXIST);
      }
      throw _crErr(CAPTION, msgErr);
    }
    if (!json.series || !json.series[0]) {
      throw _crErr(CAPTION, MSG.DATA_EMPTY);
    }
    return true;
  }
};

exports.default = EiaApi;
//# sourceMappingURL=EiaApi.js.map