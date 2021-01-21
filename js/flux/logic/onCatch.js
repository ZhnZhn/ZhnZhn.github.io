"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _Msg = _interopRequireDefault(require("../../constants/Msg"));

var M = _Msg["default"].Alert;
var C = {
  FETCH: 'fetch',
  CODE_429: '429',
  ERR: 'ERROR'
};
var _assign = Object.assign;

var _addErrDescrTo = function _addErrDescrTo(option, msg) {
  var caption = msg.caption,
      descr = msg.descr;

  _assign(option, {
    alertCaption: caption,
    alertDescr: descr
  });
};

var _crDfErrDescr = function _crDfErrDescr(error) {
  var _ref = error || {},
      errCaption = _ref.errCaption,
      _ref$message = _ref.message,
      message = _ref$message === void 0 ? '' : _ref$message,
      caption = errCaption || C.ERR;

  return message.indexOf(M.ERR_10.token) !== -1 ? M.ERR_10 : {
    caption: caption,
    descr: message
  };
};

var _isMsgByCode = function _isMsgByCode(err, code) {
  return err.message.indexOf(code) !== -1;
};

var _crErrDescr = function _crErrDescr(error) {
  if (error instanceof TypeError) {
    if (_isMsgByCode(error, C.CODE_429)) {
      return M.TOO_MANY_REQUEST;
    } else if (_isMsgByCode(error, C.FETCH)) {
      return M.NETWORK_ERROR;
    }
  }

  return _crDfErrDescr(error);
};

var onCatch = function onCatch(_ref2) {
  var error = _ref2.error,
      option = _ref2.option,
      onFailed = _ref2.onFailed;

  var _errDescr = _crErrDescr(error);

  _addErrDescrTo(option, _errDescr);

  if (typeof onFailed === 'function') {
    onFailed(option);
  }
};

var _default = onCatch;
exports["default"] = _default;
//# sourceMappingURL=onCatch.js.map