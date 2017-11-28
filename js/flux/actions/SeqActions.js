'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _ChartStore = require('../stores/ChartStore');

var _ChartStore2 = _interopRequireDefault(_ChartStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C = {
  TIMEOUT: 10000
};

var SeqActions = function () {
  function SeqActions(arr) {
    (0, _classCallCheck3.default)(this, SeqActions);

    this.arr = arr;
    this.max = arr.length - 1;
    this.index = 0;
    this.unsubscribe = _ChartStore2.default.listen(this._onStore.bind(this));
  }

  (0, _createClass3.default)(SeqActions, [{
    key: 'run',
    value: function run() {
      this._timeID = setTimeout(this._clearByTime, C.TIMEOUT);
      this._runStep();
    }
  }, {
    key: '_clearByTime',
    value: function _clearByTime() {
      if (typeof this.unsubscribe === 'function') {
        this.unsubscribe();
      }
    }
  }, {
    key: '_clear',
    value: function _clear() {
      clearTimeout(this._timeID);
      this.unsubscribe();
    }
  }, {
    key: '_runStep',
    value: function _runStep() {
      var step = this.arr[this.index];
      step.action.apply(step, (0, _toConsumableArray3.default)(step.args));
    }
  }, {
    key: '_onStore',
    value: function _onStore(type) {
      var step = this.arr[this.index];
      if (type === step.type) {
        if (this.index < this.max) {
          this.index += 1;
          this._runStep();
        } else {
          this._clear();
        }
      }
    }
  }]);
  return SeqActions;
}();

exports.default = SeqActions;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\actions\SeqActions.js.map