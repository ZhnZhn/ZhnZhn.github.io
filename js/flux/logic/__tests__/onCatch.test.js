"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _onCatch = _interopRequireDefault(require("../onCatch"));

var _Msg = _interopRequireDefault(require("../../../constants/Msg"));

var M = _Msg["default"].Alert;

var _crAlertDescrFrom = function _crAlertDescrFrom(_ref) {
  var caption = _ref.caption,
      descr = _ref.descr;
  return {
    alertCaption: caption,
    alertDescr: descr
  };
};

describe('onCatch', function () {
  test('should call onFailed with option with alertDesr', function () {
    var onFailed = jest.fn(),
        _callWithAndTestFor = function _callWithAndTestFor(error, errDescr) {
      (0, _onCatch["default"])({
        error: error,
        option: {},
        onFailed: onFailed
      });
      expect(onFailed).toBeCalledWith(_crAlertDescrFrom(errDescr));
    };

    _callWithAndTestFor(new TypeError('fetch'), M.NETWORK_ERROR);

    _callWithAndTestFor(new TypeError('429'), M.TOO_MANY_REQUEST);

    _callWithAndTestFor({
      message: M.ERR_10.token
    }, M.ERR_10);

    _callWithAndTestFor({
      errCaption: 'Some Err',
      message: 'msg'
    }, {
      caption: 'Some Err',
      descr: 'msg'
    });

    var ERR_DESCR_MSG = {
      caption: 'ERROR',
      descr: 'msg'
    };

    _callWithAndTestFor({
      message: 'msg'
    }, ERR_DESCR_MSG);

    _callWithAndTestFor({
      errCaption: '',
      message: 'msg'
    }, ERR_DESCR_MSG);

    var DF_ERR_DESCR = {
      caption: 'ERROR',
      descr: ''
    };

    _callWithAndTestFor({}, DF_ERR_DESCR);

    _callWithAndTestFor(void 0, DF_ERR_DESCR);

    _callWithAndTestFor(null, DF_ERR_DESCR);
  });
  test('should does not throw in case onFailed is not function', function () {
    expect(function () {
      return (0, _onCatch["default"])({
        option: {},
        error: {}
      });
    }).not.toThrow();
  });
});
//# sourceMappingURL=onCatch.test.js.map