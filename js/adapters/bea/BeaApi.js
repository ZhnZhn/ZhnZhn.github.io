"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var C = {
  URL: 'https://apps.bea.gov/api/data/?Year=ALL&ResultFormat=JSON&method=GETDATA&UserID'
};
var _isArr = Array.isArray,
    _assign = Object.assign,
    crError = _AdapterFn["default"].crError;

var _crSubtitle = function _crSubtitle(title, subtitle) {
  return subtitle ? title + ": " + subtitle : title;
};

var _setCaptionTo = function _setCaptionTo(option) {
  var title = option.title,
      subtitle = option.subtitle,
      dfTitle = option.dfTitle;

  _assign(option, {
    itemCaption: title,
    title: dfTitle,
    subtitle: _crSubtitle(title, subtitle)
  });
};

var BeaApi = {
  getRequestUrl: function getRequestUrl(option) {
    var TableID = option.TableID,
        DataSetName = option.DataSetName,
        apiKey = option.apiKey,
        ValueName = option.ValueName,
        _option$items = option.items,
        items = _option$items === void 0 ? [] : _option$items,
        value = items[0].value,
        oneCaption = items[0].caption,
        _Frequncy = oneCaption.indexOf('(A,Q)') === -1 ? 'A' : 'Q';

    _setCaptionTo(option);

    return C.URL + "=" + apiKey + "&TableID=" + TableID + "&DataSetName=" + DataSetName + "&Frequency=" + _Frequncy + "&" + ValueName + "=" + value;
  },
  checkResponse: function checkResponse(json) {
    var BEAAPI = json.BEAAPI,
        _ref = BEAAPI || {},
        _ref$Results = _ref.Results,
        Results = _ref$Results === void 0 ? {} : _ref$Results,
        ResError = _ref.Error;

    if (ResError) {
      var ErrorDetail = ResError.ErrorDetail;
      throw crError(ResError.APIErrorCode, ErrorDetail.Description || ResError.APIErrorDescription);
    }

    if (Results.Error || !_isArr(Results.Data)) {
      return crError();
    }

    return true;
  }
};
var _default = BeaApi;
exports["default"] = _default;
//# sourceMappingURL=BeaApi.js.map