"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var HandleF = {
  set: function set(propName, value) {
    return function () {
      this[propName] = value;
    };
  },
  reg: function reg(propName) {
    return function (node) {
      this[propName] = node;
    };
  },
  enterTo: function enterTo(propName) {
    return function (value) {
      var _this$setState;

      this.setState((_this$setState = {}, _this$setState[propName] = value, _this$setState));
    };
  },
  closeTo: function closeTo(propName) {
    return function () {
      var _this$setState2;

      this.setState((_this$setState2 = {}, _this$setState2[propName] = false, _this$setState2));
    };
  },
  toggleModalBy: function toggleModalBy(propName1, propName2) {
    return function () {
      var _ref;

      var event = (_ref = arguments.length - 1, _ref < 0 || arguments.length <= _ref ? undefined : arguments[_ref]);

      if (event && event.target === this[propName2].current) {
        this.setState(function (prevState) {
          var _ref2;

          return _ref2 = {}, _ref2[propName1] = !prevState[propName1], _ref2;
        });
      }
    };
  }
};
var _default = HandleF;
exports["default"] = _default;
//# sourceMappingURL=HandleF.js.map