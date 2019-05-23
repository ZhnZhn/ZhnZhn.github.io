'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fnCatch = undefined;

var _Msg = require('../../constants/Msg');

var _Msg2 = _interopRequireDefault(_Msg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var M = _Msg2.default.Alert;

var C = {
  FETCH: 'fetch',
  CODE_429: '429'
};

var _addErrMsg = function _addErrMsg(option, msg) {
  var caption = msg.caption,
      descr = msg.descr;

  Object.assign(option, {
    alertCaption: caption,
    alertDescr: descr
  });
};

var _crAlertDescr = function _crAlertDescr(error) {
  var errCaption = error.errCaption,
      _error$message = error.message,
      message = _error$message === undefined ? '' : _error$message;

  if (error.errCaption) {
    return {
      caption: errCaption,
      descr: message
    };
  } else if (message.indexOf(M.ZH_1000.token) !== -1) {
    return M.ZH_1000;
  } else {
    return {
      caption: M.RUNTIME_ERROR.caption,
      descr: message
    };
  }
};

var _addDfErrMsg = function _addDfErrMsg(option, error) {
  var _obj = _crAlertDescr(error);
  _addErrMsg(option, _obj);
};

var _isMsgByCode = function _isMsgByCode(err, code) {
  return err.message.indexOf(code) !== -1;
};

var fnCatch = exports.fnCatch = function fnCatch(_ref) {
  var error = _ref.error,
      option = _ref.option,
      onFailed = _ref.onFailed;

  if (error instanceof TypeError) {
    if (_isMsgByCode(error, C.CODE_429)) {
      _addErrMsg(option, M.TOO_MANY_REQUEST);
    } else if (_isMsgByCode(error, C.FETCH)) {
      _addErrMsg(option, M.NETWORK_ERROR);
    } else {
      _addDfErrMsg(option, error);
    }
  } else {
    _addDfErrMsg(option, error);
  }

  if (typeof onFailed === 'function') {
    onFailed(option);
  }
};
//# sourceMappingURL=fnCatch.js.map