"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var BatchActions =
/*#__PURE__*/
function () {
  function BatchActions(arr) {
    this.arr = arr;
  }

  var _proto = BatchActions.prototype;

  _proto.run = function run() {
    this.arr.forEach(function (item) {
      var action = item.action,
          args = item.args;
      action.apply(void 0, args);
    });
  };

  return BatchActions;
}();

var _default = BatchActions;
exports["default"] = _default;
//# sourceMappingURL=BatchActions.js.map