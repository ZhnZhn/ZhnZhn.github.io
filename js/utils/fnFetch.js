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
  //LIMIT_REMAINING: 'X-RateLimit-Remaining',
  REQ_ERR: 'Request Error',
  RESP_ERR: 'Response Error',

  MSG_400: '400: Bad request.',
  MSG_404: '404: Resource is not existed.',
  MSG_429: '429: Too many request in a given amount of time (rate limiting).',
  MSG_503: '503: Back-end server is at capacity.'
};

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _isInArrValue = function _isInArrValue(arr, value) {
  return Array.isArray(arr) && arr.indexOf(value) !== -1;
};

var _crErr = function _crErr(message) {
  var errCaption = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : C.REQ_ERR;
  return {
    errCaption: errCaption,
    message: message
  };
};

var _throwIfNotStatus = function _throwIfNotStatus(errStatus, status, msg) {
  if (!_isInArrValue(errStatus, status)) {
    throw _crErr(msg);
  }
};

var _promiseAll = function _promiseAll(_ref) {
  var response = _ref.response,
      propName = _ref.propName,
      status = _ref.status,
      getLimitRemaiming = _ref.getLimitRemaiming;

  var headers = response.headers,
      _limitRemaining = headers && _isFn(headers.get) && _isFn(getLimitRemaiming) ? getLimitRemaiming(headers) : void 0;
  return Promise.all([Promise.resolve(_limitRemaining), response[propName](), Promise.resolve(status)]);
};

var _fFetch = function _fFetch(propName, type) {
  return function (_ref2) {
    var uri = _ref2.uri,
        _ref2$option = _ref2.option,
        option = _ref2$option === undefined ? {} : _ref2$option,
        optionFetch = _ref2.optionFetch,
        getLimitRemaiming = _ref2.getLimitRemaiming,
        onCheckResponse = _ref2.onCheckResponse,
        onFetch = _ref2.onFetch,
        onCompleted = _ref2.onCompleted,
        onFailed = _ref2.onFailed,
        onCatch = _ref2.onCatch;

    var _fnFetch = type !== 'jsonp' ? fetch : _fetchJsonp2.default;
    _fnFetch(uri, optionFetch).then(function (response) {
      var status = response.status,
          statusText = response.statusText,
          ok = response.ok,
          resErrStatus = option.resErrStatus;

      if (status >= 200 && status < 400 || ok) {
        return _promiseAll({
          response: response, propName: propName,
          getLimitRemaiming: getLimitRemaiming
        });
      } else if (status === 400) {
        _throwIfNotStatus(resErrStatus, status, C.MSG_400);
        return _promiseAll({ response: response, propName: propName, status: status });
      } else if (status === 404) {
        throw _crErr(C.MSG_404);
      } else if (status === 429) {
        throw _crErr(C.MSG_429);
      } else if (status > 400 && status < 500) {
        _throwIfNotStatus(resErrStatus, status, status + ': ' + statusText);
        return _promiseAll({ response: response, propName: propName, status: status });
      } else if (status === 503) {
        throw _crErr(C.MSG_503);
      } else if (status >= 500 && status < 600) {
        throw _crErr(status + ': ' + statusText, C.RESP_ERR);
      } else {
        return [undefined, {}, status];
      }
    }).then(function (_ref3) {
      var _ref4 = (0, _slicedToArray3.default)(_ref3, 3),
          limitRemaining = _ref4[0],
          json = _ref4[1],
          status = _ref4[2];

      if (_isFn(onCheckResponse)) {
        if (onCheckResponse(json, option, status)) {
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