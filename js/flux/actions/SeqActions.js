"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _ChartStore = _interopRequireDefault(require("../stores/ChartStore"));

var C = {
  TIMEOUT: 10000
};

var SeqActions = /*#__PURE__*/function () {
  function SeqActions(arr) {
    this.arr = arr;
    this.max = arr.length - 1;
    this.index = 0;
    this.unsubscribe = _ChartStore["default"].listen(this._onStore.bind(this));
  }

  var _proto = SeqActions.prototype;

  _proto.run = function run() {
    this._timeID = setTimeout(this._clearByTime, C.TIMEOUT);

    this._runStep();
  };

  _proto._clearByTime = function _clearByTime() {
    if (typeof this.unsubscribe === 'function') {
      this.unsubscribe();
    }
  };

  _proto._clear = function _clear() {
    clearTimeout(this._timeID);
    this.unsubscribe();
  };

  _proto._runStep = function _runStep() {
    var step = this.arr[this.index];
    step.action.apply(step, step.args);
  };

  _proto._onStore = function _onStore(type) {
    var step = this.arr[this.index];

    if (type === step.type) {
      if (this.index < this.max) {
        this.index += 1;

        this._runStep();
      } else {
        this._clear();
      }
    } else if (type && type === step.typeFail) {
      this._clear();
    }
  };

  return SeqActions;
}();

var _default = SeqActions;
exports["default"] = _default;
//# sourceMappingURL=SeqActions.js.map