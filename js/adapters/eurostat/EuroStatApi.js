'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('./api/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REQUEST_ERROR = 'Request Error',
    MESSAGE_HEADER = '400: Bad Request\n',
    RES_ERR_STATUS = [400],
    MSG_400 = '400: Bad request.\nDataset contains no data. One or more filtering elements (query parameters) are probably not valid.\nMaybe try to request this data set with older date or another country.';

var _crDetailMsg = function _crDetailMsg(label, option) {
  var _option$alertGeo = option.alertGeo,
      alertGeo = _option$alertGeo === undefined ? '' : _option$alertGeo,
      _option$alertMetric = option.alertMetric,
      alertMetric = _option$alertMetric === undefined ? '' : _option$alertMetric;

  return MESSAGE_HEADER + label + ('\n\nIt seems country-dataset doesn\'t exsist.\n' + alertGeo + ':' + alertMetric + '\n\nIf you use For Date input field in Dialog\ntry to use more late date.');
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

var _isRouteUrlN = function _isRouteUrlN(_ref) {
  var _type = _ref._type;
  return _type === 'selectN';
};

var EuroStatApi = {
  getRequestUrl: function getRequestUrl(option) {
    _addPropTo(option);
    return _isRouteUrlN(option) ? _api2.default.crUrlN(option) : option.dfParams ? _api2.default.crUrlWithParams(option) : _api2.default.crUrl(option);
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

exports.default = EuroStatApi;
//# sourceMappingURL=EuroStatApi.js.map