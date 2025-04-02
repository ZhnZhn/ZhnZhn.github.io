"use strict";

exports.__esModule = true;
exports.fetchTxt = exports.fetchJsonHm = exports.fetchJson = void 0;
//LIMIT_REMAINING: 'X-RateLimit-Remaining',
const REQ_ERR = 'Request Error',
  RESP_ERR = 'Response Error',
  MSG_URI_EMPTY = "Item url isn't specified by adapter.",
  MSG_400 = '400: Bad request.';
const HTTP_CODE_ERR_MSG = {
  403: '403: Forbidden.',
  404: '404: Resource is not existed.',
  429: '429: Too many request in a given amount of time (rate limiting).',
  503: '503: Back-end server is at capacity.'
};
const _isFn = fn => typeof fn === 'function',
  _isArr = Array.isArray,
  _assign = Object.assign,
  FN_NOOP = () => {};
const _isInArrValue = (arr, value) => _isArr(arr) && arr.indexOf(value) !== -1;
const _crErr = function (message, errCaption) {
  if (errCaption === void 0) {
    errCaption = REQ_ERR;
  }
  return {
    errCaption,
    message
  };
};
const _throwIfNotStatus = (errStatus, status, msg) => {
  if (!_isInArrValue(errStatus, status)) {
    throw _crErr(msg);
  }
};
const _promiseAll = _ref => {
  let {
    response,
    propName,
    status,
    getLimitRemaiming
  } = _ref;
  const headers = response.headers,
    _limitRemaining = headers && _isFn(headers.get) && _isFn(getLimitRemaiming) ? getLimitRemaiming(headers) : void 0;
  return Promise.all([Promise.resolve(_limitRemaining), response[propName](), Promise.resolve(status)]);
};
const _fFetch = propName => function (_ref2) {
  let {
    uri,
    option = {},
    optionFetch,
    getLimitRemaiming,
    onCheckResponse = FN_NOOP,
    onFetch,
    onCompleted,
    onFailed,
    onCatch
  } = _ref2;
  if (!uri) {
    if (_isFn(onFailed)) {
      setTimeout(() => onFailed(_assign(option, {
        alertCaption: REQ_ERR,
        alertDescr: MSG_URI_EMPTY
      })), 0);
    }
    return;
  }
  fetch(uri, optionFetch).then(response => {
    const {
        status,
        statusText,
        ok
      } = response,
      {
        resErrStatus
      } = option;
    if (status >= 200 && status < 400 || ok) {
      return _promiseAll({
        response,
        propName,
        getLimitRemaiming
      });
    } else if (status === 400) {
      _throwIfNotStatus(resErrStatus, status, MSG_400);
      return _promiseAll({
        response,
        propName,
        status
      });
      //403,404,429,503
    } else if (HTTP_CODE_ERR_MSG[status]) {
      throw _crErr(HTTP_CODE_ERR_MSG[status]);
    } else if (status > 400 && status < 500) {
      _throwIfNotStatus(resErrStatus, status, `${status}: ${statusText}`);
      return _promiseAll({
        response,
        propName,
        status
      });
    } else if (status >= 500 && status < 600) {
      throw _crErr(`${status}: ${statusText}`, RESP_ERR);
    } else {
      return [void 0, {}, status];
    }
  }).then(_ref3 => {
    let [limitRemaining, json, status] = _ref3;
    const _json = onCheckResponse(json, option, status);
    option.limitRemaining = limitRemaining;
    onFetch({
      json: _json || json,
      option,
      onCompleted
    });
  }).catch(error => {
    if (_isFn(onCatch)) {
      onCatch({
        error,
        option,
        onFailed
      });
    } else {
      console.log(error);
    }
  });
};
const fetchJson = exports.fetchJson = _fFetch('json');
const fetchTxt = exports.fetchTxt = _fFetch('text');
const fetchJsonHm = (url, onCatch) => fetch(url).then(res => {
  if (!res.ok) {
    throw new Error(`Network response error: ${res.status}`);
  }
  return res.json();
}).then(json => (json || {}).hm);
exports.fetchJsonHm = fetchJsonHm;
//# sourceMappingURL=fnFetch.js.map