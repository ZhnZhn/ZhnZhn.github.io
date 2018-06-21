'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchJsonp = exports.fetchTxt = exports.fetchJson = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _fetchJsonp = require('fetch-jsonp');

var _fetchJsonp2 = _interopRequireDefault(_fetchJsonp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C = {
  LIMIT_REMAINING: 'X-RateLimit-Remaining',
  REQ_ERR: 'Request Error',
  RESP_ERR: 'Response Error'
};

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _fnMsg400 = function _fnMsg400(option) {
  if (option.loadId === "EU_STAT") {
    return '400: Bad request.\nDataset contains no data. One or more filtering elements (query parameters) are probably invalid.\nMaybe try to request this data set with older date or another country.';
  } else {
    return '400: Bad request.';
  }
};

var _fnMsg404 = function _fnMsg404() {
  return '404: Resource is not existed.';
};
var _fnMsg429 = function _fnMsg429() {
  return '429: Too many request in a given amount of time (rate limiting).';
};
var _fnMsg503 = function _fnMsg503() {
  return '503: Back-end server is at capacity.';
};

var _crErr = function _crErr(message) {
  var errCaption = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : C.REQ_ERR;

  return { errCaption: errCaption, message: message };
};

var _fFetch = function _fFetch(propName, type) {
  return function (_ref) {
    var uri = _ref.uri,
        _ref$option = _ref.option,
        option = _ref$option === undefined ? {} : _ref$option,
        optionFetch = _ref.optionFetch,
        onCheckResponse = _ref.onCheckResponse,
        onFetch = _ref.onFetch,
        onCompleted = _ref.onCompleted,
        onFailed = _ref.onFailed,
        onCatch = _ref.onCatch;

    var _fnFetch = type !== 'jsonp' ? fetch : _fetchJsonp2.default;
    _fnFetch(uri, optionFetch).then(function (response) {
      var status = response.status,
          statusText = response.statusText,
          _response$headers = response.headers,
          headers = _response$headers === undefined ? {} : _response$headers,
          ok = response.ok;

      if (status >= 200 && status < 400 || ok) {
        if (_isFn(headers.get)) {
          return Promise.all([Promise.resolve(headers.get(C.LIMIT_REMAINING)), response[propName]()]);
        } else {
          return Promise.all([Promise.resolve(undefined), response[propName]()]);
        }
      } else if (status === 400) {
        throw _crErr(_fnMsg400(option));
      } else if (status === 404) {
        throw _crErr(_fnMsg404(option));
      } else if (status === 429) {
        throw _crErr(_fnMsg429(option));
      } else if (status > 400 && status < 500) {
        throw _crErr(status + ': ' + statusText);
      } else if (status === 503) {
        throw _crErr(_fnMsg503(option));
      } else if (status >= 500 && status < 600) {
        throw _crErr(status + ': ' + statusText, C.RESP_ERR);
      } else {
        return [undefined, {}];
      }
    }).then(function (_ref2) {
      var _ref3 = (0, _slicedToArray3.default)(_ref2, 2),
          limitRemaining = _ref3[0],
          json = _ref3[1];

      if (_isFn(onCheckResponse)) {
        if (onCheckResponse(json, option)) {
          option.limitRemaining = limitRemaining;
          onFetch({ json: json, option: option, onCompleted: onCompleted });
        }
      } else {
        option.limitRemaining = limitRemaining;
        onFetch({ json: json, option: option, onCompleted: onCompleted });
      }
    }).catch(function (error) {
      if (_isFn(onCatch)) {
        onCatch({ error: error, option: option, onFailed: onFailed });
      } else {
        console.log(error);
      }
    });
  };
};

var fetchJson = exports.fetchJson = _fFetch('json');
var fetchTxt = exports.fetchTxt = _fFetch('text');
var fetchJsonp = exports.fetchJsonp = _fFetch('json', 'jsonp');
//# sourceMappingURL=fnFetch.js.map