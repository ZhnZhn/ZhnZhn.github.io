"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var C = {
  //URL: 'https://www.bea.gov/api/data/?Year=ALL&ResultFormat=JSON&method=GETDATA&UserID'
  URL: 'https://apps.bea.gov/api/data/?Year=ALL&ResultFormat=JSON&method=GETDATA&UserID',
  DF_ERR_MSG: 'No data exist for selected criteria.'
};
var _isArr = Array.isArray,
    _assign = Object.assign;

var _setCaptionTo = function _setCaptionTo(option) {
  var title = option.title,
      dfTitle = option.dfTitle;

  _assign(option, {
    itemCaption: title,
    title: dfTitle,
    subtitle: title
  });
};

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
        oneCaption = _option$oneCaption === void 0 ? '' : _option$oneCaption,
        _Frequncy = oneCaption.indexOf('(A,Q)') === -1 ? 'A' : 'Q';

    _setCaptionTo(option);

    return C.URL + "=" + apiKey + "&TableID=" + TableID + "&DataSetName=" + DataSetName + "&Frequency=" + _Frequncy + "&" + ValueName + "=" + value;
  },
  checkResponse: function checkResponse(json) {
    var _json$BEAAPI = json.BEAAPI,
        BEAAPI = _json$BEAAPI === void 0 ? {} : _json$BEAAPI,
        _BEAAPI$Results = BEAAPI.Results,
        Results = _BEAAPI$Results === void 0 ? {} : _BEAAPI$Results,
        ResError = BEAAPI.Error;

    if (ResError) {
      var ErrorDetail = ResError.ErrorDetail;
      throw _crErr(ResError.APIErrorCode || '', ErrorDetail.Description || ResError.APIErrorDescription || C.DF_ERR_MSG);
    }

    if (Results.Error || !_isArr(Results.Data)) {
      return _crErr('', C.DF_ERR_MSG);
    }

    return true;
  }
};
var _default = BeaApi;
exports["default"] = _default;
//# sourceMappingURL=BeaApi.js.map