"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.fetchJsonp = exports.fetchTxt = exports.fetchJson = void 0;

var _fetchJsonp = _interopRequireDefault(require("fetch-jsonp"));

var C = {
  //LIMIT_REMAINING: 'X-RateLimit-Remaining',
  REQ_ERR: 'Request Error',
  RESP_ERR: 'Response Error',
  MSG_URI_EMPTY: "Item url isn't specified by adapter.",
  MSG_400: '400: Bad request.',
  MSG_404: '404: Resource is not existed.',
  MSG_429: '429: Too many request in a given amount of time (rate limiting).',
  MSG_503: '503: Back-end server is at capacity.'
};

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
},
    _isArr = Array.isArray,
    _assign = Object.assign,
    _noop = function _noop() {};

var _isInArrValue = function _isInArrValue(arr, value) {
  return _isArr(arr) && arr.indexOf(value) !== -1;
};

var _crErr = function _crErr(message, errCaption) {
  if (errCaption === void 0) {
    errCaption = C.REQ_ERR;
  }

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
        option = _ref2$option === void 0 ? {} : _ref2$option,
        optionFetch = _ref2.optionFetch,
        getLimitRemaiming = _ref2.getLimitRemaiming,
        _ref2$onCheckResponse = _ref2.onCheckResponse,
        onCheckResponse = _ref2$onCheckResponse === void 0 ? _noop : _ref2$onCheckResponse,
        onFetch = _ref2.onFetch,
        onCompleted = _ref2.onCompleted,
        onFailed = _ref2.onFailed,
        onCatch = _ref2.onCatch;

    if (!uri) {
      if (_isFn(onFailed)) {
        setTimeout(function () {
          return onFailed(_assign(option, {
            alertCaption: C.REQ_ERR,
            alertDescr: C.MSG_URI_EMPTY
          }));
        }, 0);
      }

      return;
    }

    var _fnFetch = type !== 'jsonp' ? fetch : _fetchJsonp["default"];

    _fnFetch(uri, optionFetch).then(function (response) {
      var status = response.status,
          statusText = response.statusText,
          ok = response.ok,
          resErrStatus = option.resErrStatus;

      if (status >= 200 && status < 400 || ok) {
        return _promiseAll({
          response: response,
          propName: propName,
          getLimitRemaiming: getLimitRemaiming
        });
      } else if (status === 400) {
        _throwIfNotStatus(resErrStatus, status, C.MSG_400);

        return _promiseAll({
          response: response,
          propName: propName,
          status: status
        });
      } else if (status === 404) {
        throw _crErr(C.MSG_404);
      } else if (status === 429) {
        throw _crErr(C.MSG_429);
      } else if (status > 400 && status < 500) {
        _throwIfNotStatus(resErrStatus, status, status + ": " + statusText);

        return _promiseAll({
          response: response,
          propName: propName,
          status: status
        });
      } else if (status === 503) {
        throw _crErr(C.MSG_503);
      } else if (status >= 500 && status < 600) {
        throw _crErr(status + ": " + statusText, C.RESP_ERR);
      } else {
        return [void 0, {}, status];
      }
    }).then(function (_ref3) {
      var limitRemaining = _ref3[0],
          json = _ref3[1],
          status = _ref3[2];
      onCheckResponse(json, option, status);
      option.limitRemaining = limitRemaining;
      onFetch({
        json: json,
        option: option,
        onCompleted: onCompleted
      });
    })["catch"](function (error) {
      if (_isFn(onCatch)) {
        onCatch({
          error: error,
          option: option,
          onFailed: onFailed
        });
      } else {
        console.log(error);
      }
    });
  };
};

var fetchJson = _fFetch('json');

exports.fetchJson = fetchJson;

var fetchTxt = _fFetch('text');

exports.fetchTxt = fetchTxt;

var fetchJsonp = _fFetch('json', 'jsonp');

exports.fetchJsonp = fetchJsonp;
//# sourceMappingURL=fnFetch.js.map