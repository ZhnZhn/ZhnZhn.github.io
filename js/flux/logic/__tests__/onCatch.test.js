"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _onCatch = _interopRequireDefault(require("../onCatch"));

var _Msg = require("../../../constants/Msg");

const _crAlertDescrFrom = _ref => {
  let {
    caption,
    descr
  } = _ref;
  return {
    alertCaption: caption,
    alertDescr: descr
  };
};

describe('onCatch', () => {
  test('should call onFailed with option with alertDesr', () => {
    const onFailed = jest.fn(),
          _callWithAndTestFor = (error, errDescr) => {
      (0, _onCatch.default)({
        error,
        option: {},
        onFailed
      });
      expect(onFailed).toBeCalledWith(_crAlertDescrFrom(errDescr));
    };

    _callWithAndTestFor(new TypeError('fetch'), _Msg.ERR_NETWORK);

    _callWithAndTestFor(new TypeError('429'), _Msg.ERR_TOO_MANY_REQUEST);

    _callWithAndTestFor({
      message: _Msg.ERR_10.token
    }, _Msg.ERR_10);

    _callWithAndTestFor({
      errCaption: 'Some Err',
      message: 'msg'
    }, {
      caption: 'Some Err',
      descr: 'msg'
    });

    const ERR_DESCR_MSG = {
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

    const DF_ERR_DESCR = {
      caption: 'ERROR',
      descr: ''
    };

    _callWithAndTestFor({}, DF_ERR_DESCR);

    _callWithAndTestFor(void 0, DF_ERR_DESCR);

    _callWithAndTestFor(null, DF_ERR_DESCR);
  });
  test('should does not throw in case onFailed is not function', () => {
    expect(() => (0, _onCatch.default)({
      option: {},
      error: {}
    })).not.toThrow();
  });
});
//# sourceMappingURL=onCatch.test.js.map