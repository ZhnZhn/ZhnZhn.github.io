"use strict";

exports.__esModule = true;
exports.default = void 0;

var _Msg = require("../../constants/Msg");

const FETCH = 'fetch',
      CODE_429 = '429',
      ERROR = 'ERROR';
const _assign = Object.assign;

const _addErrDescrTo = (option, msg) => {
  const {
    caption,
    descr
  } = msg;

  _assign(option, {
    alertCaption: caption,
    alertDescr: descr
  });
};

const _crDfErrDescr = error => {
  const {
    errCaption,
    message = ''
  } = error || {},
        caption = errCaption || ERROR;
  return message.indexOf(_Msg.ERR_10.token) !== -1 ? _Msg.ERR_10 : {
    caption,
    descr: message
  };
};

const _isMsgByCode = (err, code) => err.message.indexOf(code) !== -1;

const _crErrDescr = error => {
  if (error instanceof TypeError) {
    if (_isMsgByCode(error, CODE_429)) {
      return _Msg.ERR_TOO_MANY_REQUEST;
    } else if (_isMsgByCode(error, FETCH)) {
      return _Msg.ERR_NETWORK;
    }
  }

  return _crDfErrDescr(error);
};

const onCatch = function (_ref) {
  let {
    error,
    option,
    onFailed
  } = _ref;

  const _errDescr = _crErrDescr(error);

  _addErrDescrTo(option, _errDescr);

  if (typeof onFailed === 'function') {
    onFailed(option);
  }
};

var _default = onCatch;
exports.default = _default;
//# sourceMappingURL=onCatch.js.map