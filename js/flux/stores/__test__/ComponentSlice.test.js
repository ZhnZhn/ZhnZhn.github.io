'use strict';

var _ChartStore = require('../ChartStore');

var _ChartStore2 = _interopRequireDefault(_ChartStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _crChb = function _crChb() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'checkbox';
  return {
    name: name,
    setUnchecked: function setUnchecked() {}
  };
};
var _crSpyUnchecked = function _crSpyUnchecked(chb) {
  return jest.spyOn(chb, 'setUnchecked');
};

describe('ComponentSlice', function () {
  test('should set/unset active container checkbox', function () {
    var chb = _crChb();
    expect(_ChartStore2.default.activeContChb).toBe(undefined);

    _ChartStore2.default.onSetActiveContainer(true, chb);
    expect(_ChartStore2.default.activeContChb).toBe(chb);
    _ChartStore2.default.onSetActiveContainer(true, chb);
    expect(_ChartStore2.default.activeContChb).toBe(chb);

    _ChartStore2.default.onSetActiveContainer(false, chb);
    expect(_ChartStore2.default.activeContChb).toBe(null);
  });

  test('should call setUnchecked on activeContChb', function () {
    var _chb = _crChb();
    var spy = _crSpyUnchecked(_chb);

    _ChartStore2.default.onSetActiveContainer(true, _chb);
    expect(_ChartStore2.default.activeContChb).toBe(_chb);

    _ChartStore2.default.onSetActiveContainer(false, _chb);
    expect(spy).toHaveBeenCalled();
    expect(_ChartStore2.default.activeContChb).toBe(null);
    //spy.mockRestore()
  });

  test('should call setUnchecked on prev chb', function () {
    var _prevChb = _crChb('prev'),
        _nextChb = _crChb('next'),
        spy = _crSpyUnchecked(_prevChb);

    _ChartStore2.default.onSetActiveContainer(true, _prevChb);
    expect(_ChartStore2.default.activeContChb).toBe(_prevChb);

    _ChartStore2.default.onSetActiveContainer(true, _nextChb);
    expect(spy).toHaveBeenCalled();
    expect(_ChartStore2.default.activeContChb).toBe(_nextChb);
    //spy.mockRestore()
  });
});
//# sourceMappingURL=ComponentSlice.test.js.map