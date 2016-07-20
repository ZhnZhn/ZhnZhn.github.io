'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.fnCatch = undefined;

var _Msg = require('../../constants/Msg');

var _Msg2 = _interopRequireDefault(_Msg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fnCatch = exports.fnCatch = function fnCatch(_ref) {
   var error = _ref.error;
   var option = _ref.option;
   var onFailed = _ref.onFailed;

   if (error instanceof TypeError) {
      if (error.message.indexOf('code 503') !== -1) {
         option.alertCaption = _Msg2.default.Alert.SERVICE_UNAVAILABLE.caption;
         option.alertDescr = _Msg2.default.Alert.SERVICE_UNAVAILABLE.descr;
      } else if (error.message.indexOf('fetch') !== -1) {
         option.alertCaption = _Msg2.default.Alert.NETWORK_ERROR.caption;
         option.alertDescr = _Msg2.default.Alert.NETWORK_ERROR.descr;
      } else {
         option.alertCaption = error.errCaption ? error.errCaption : _Msg2.default.Alert.RUNTIME_ERROR.caption;
         option.alertDescr = error.message;
      }
   } else {
      option.alertCaption = error.errCaption ? error.errCaption : _Msg2.default.Alert.RUNTIME_ERROR.caption;
      option.alertDescr = error.message;
   }

   onFailed(option);
};
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\fnCatch.js.map