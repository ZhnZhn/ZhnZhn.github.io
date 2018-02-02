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

var _fnAddAlert = function _fnAddAlert(option, msg) {
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

var _fnAddDfAlert = function _fnAddDfAlert(option, error) {
  var _obj = _crAlertDescr(error);
  _fnAddAlert(option, _obj);
};

var fnCatch = exports.fnCatch = function fnCatch(_ref) {
  var error = _ref.error,
      option = _ref.option,
      onFailed = _ref.onFailed;

  if (error instanceof TypeError) {
    if (error.message.indexOf(C.CODE_429) !== -1) {
      _fnAddAlert(option, M.TOO_MANY_REQUEST);
    } else if (error.message.indexOf(C.FETCH) !== -1) {
      _fnAddAlert(option, M.NETWORK_ERROR);
    } else {
      _fnAddDfAlert(option, error);
    }
  } else {
    _fnAddDfAlert(option, error);
  }

  onFailed(option);
};
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\fnCatch.js.map