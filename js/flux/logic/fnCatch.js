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

  var chartId = option.value;

  var caption = void 0,
      descr = void 0;
  if (error instanceof TypeError) {
    if (error.message.indexOf('fetch') !== -1) {
      caption = _Msg2.default.Alert.NETWORK_ERROR.caption;
      descr = _Msg2.default.Alert.NETWORK_ERROR.descr;
    } else {
      caption = error.zhCaption ? error.zhCaption : 'Runtime Error';
      descr = error.message;
    }
  } else {
    caption = error.zhCaption ? error.zhCaption : 'Runtime Error';
    descr = error.message;
  }
  onFailed({ caption: caption, descr: descr, chartId: chartId });
};
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\fnCatch.js.map