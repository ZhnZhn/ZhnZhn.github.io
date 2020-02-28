"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _api = _interopRequireDefault(require("./api/api"));

var REQUEST_ERROR = 'Request Error',
    MESSAGE_HEADER = '400: Bad Request\n',
    RES_ERR_STATUS = [400],
    MSG_400 = '400: Bad request.\nDataset contains no data. One or more filtering elements (query parameters) are probably not valid.\nMaybe try to request this data set with older date or another country.';

var _crDetailMsg = function _crDetailMsg(label, option) {
  var _option$alertGeo = option.alertGeo,
      alertGeo = _option$alertGeo === void 0 ? '' : _option$alertGeo,
      _option$alertMetric = option.alertMetric,
      alertMetric = _option$alertMetric === void 0 ? '' : _option$alertMetric;
  return MESSAGE_HEADER + label + ("\n\nIt seems country-dataset doesn't exsist.\n" + alertGeo + ":" + alertMetric + "\n\nIf you use For Date input field in Dialog\ntry to use more late date.");
};

var _crErr = function _crErr(errCaption, message) {
  return {
    errCaption: errCaption,
    message: message
  };
};

var _addPropTo = function _addPropTo(option) {
  option.resErrStatus = [].concat(RES_ERR_STATUS);
};

var EuroStatApi = {
  getRequestUrl: function getRequestUrl(option) {
    _addPropTo(option);

    if (option.url) {
      return option.url;
    }

    var _url = _api["default"].crUrlN(option);

    return option.url = _url;
  },
  checkResponse: function checkResponse(json, option, status) {
    if (status === 400) {
      throw _crErr(REQUEST_ERROR, MSG_400);
    }

    var error = json.error;

    if (error) {
      var label = error.label;

      if (label) {
        throw _crErr(REQUEST_ERROR, _crDetailMsg(label, option));
      } else {
        throw _crErr(REQUEST_ERROR, '');
      }
    }

    return true;
  }
};
var _default = EuroStatApi;
exports["default"] = _default;
//# sourceMappingURL=EuroStatApi.js.map