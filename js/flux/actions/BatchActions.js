"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BatchActions = function () {
  function BatchActions(arr) {
    (0, _classCallCheck3.default)(this, BatchActions);

    this.arr = arr;
  }

  (0, _createClass3.default)(BatchActions, [{
    key: "run",
    value: function run() {
      this.arr.forEach(function (item) {
        var action = item.action,
            args = item.args;

        action.apply(undefined, (0, _toConsumableArray3.default)(args));
      });
    }
  }]);
  return BatchActions;
}();

exports.default = BatchActions;
//# sourceMappingURL=BatchActions.js.map