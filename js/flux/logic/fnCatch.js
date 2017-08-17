'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fnCatch = undefined;

var _Msg = require('../../constants/Msg');

var _Msg2 = _interopRequireDefault(_Msg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C = {
  FETCH: 'fetch',
  CODE_503: 'code 503'
};

var _fnAddAlert = function _fnAddAlert(option, caption, descr) {
  Object.assign(option, {
    alertCaption: caption,
    alertDescr: descr
  });
};

var _fnAddDfAlert = function _fnAddDfAlert(option, error) {
  var errCaption = error.errCaption,
      message = error.message,
      _caption = error.errCaption ? errCaption : _Msg2.default.Alert.RUNTIME_ERROR.caption;

  _fnAddAlert(option, _caption, message);
};

var fnCatch = exports.fnCatch = function fnCatch(_ref) {
  var error = _ref.error,
      option = _ref.option,
      onFailed = _ref.onFailed;

  if (error instanceof TypeError) {
    if (error.message.indexOf(C.CODE_503) !== -1) {
      _fnAddAlert(option, _Msg2.default.Alert.SERVICE_UNAVAILABLE.caption, _Msg2.default.Alert.SERVICE_UNAVAILABLE.descr);
    } else if (error.message.indexOf(C.FETCH) !== -1) {
      _fnAddAlert(option, _Msg2.default.Alert.NETWORK_ERROR.caption, _Msg2.default.Alert.NETWORK_ERROR.descr);
    } else {
      _fnAddDfAlert(option, error);
    }
  } else {
    _fnAddDfAlert(option, error);
  }

  onFailed(option);
};
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\fnCatch.js.map