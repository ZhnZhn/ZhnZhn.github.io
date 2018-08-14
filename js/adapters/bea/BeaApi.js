'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var C = {
  //URL: 'https://www.bea.gov/api/data/?Year=ALL&ResultFormat=JSON&method=GETDATA&UserID'
  URL: 'https://apps.bea.gov/api/data/?Year=ALL&ResultFormat=JSON&method=GETDATA&UserID'
};

var DF_ERR_MSG = 'No data exist for selected criteria.';

var _crErr = function _crErr(errCaption, message) {
  return {
    errCaption: errCaption,
    message: message
  };
};

var BeaApi = {
  getRequestUrl: function getRequestUrl(option) {
    var TableID = option.TableID,
        DataSetName = option.DataSetName,
        apiKey = option.apiKey,
        ValueName = option.ValueName,
        value = option.value,
        _option$oneCaption = option.oneCaption,
        oneCaption = _option$oneCaption === undefined ? '' : _option$oneCaption,
        _Frequncy = oneCaption.indexOf('(A,Q)') === -1 ? 'A' : 'Q';

    return C.URL + '=' + apiKey + '&TableID=' + TableID + '&DataSetName=' + DataSetName + '&Frequency=' + _Frequncy + '&' + ValueName + '=' + value;
  },
  checkResponse: function checkResponse(json) {
    var _json$BEAAPI = json.BEAAPI,
        BEAAPI = _json$BEAAPI === undefined ? {} : _json$BEAAPI,
        _BEAAPI$Results = BEAAPI.Results,
        Results = _BEAAPI$Results === undefined ? {} : _BEAAPI$Results,
        ResError = BEAAPI.Error;

    if (ResError) {
      var ErrorDetail = ResError.ErrorDetail;

      throw _crErr(ResError.APIErrorCode || '', ErrorDetail.Description || ResError.APIErrorDescription || DF_ERR_MSG);
    }
    if (Results.Error || !Array.isArray(Results.Data)) {
      return _crErr('', DF_ERR_MSG);
    }
    return true;
  }
};

exports.default = BeaApi;
//# sourceMappingURL=BeaApi.js.map