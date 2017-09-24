"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      this.setState((0, _defineProperty3.default)({}, propName, value));
    };
  },
  closeTo: function closeTo(propName) {
    return function () {
      this.setState((0, _defineProperty3.default)({}, propName, false));
    };
  },
  toggleModalTo: function toggleModalTo(propName1, propName2) {
    return function (event) {
      if (event.target === this[propName2]) {
        this.setState(function (prevState) {
          return (0, _defineProperty3.default)({}, propName1, !prevState[propName1]);
        });
      }
    };
  }

};

exports.default = HandleF;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\f-handle\HandleF.js.map