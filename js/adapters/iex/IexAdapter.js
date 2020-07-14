"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crAdapter = _interopRequireDefault(require("../crAdapter"));

var _RouterAdapter = _interopRequireDefault(require("./RouterAdapter"));

var IexAdapter = (0, _crAdapter["default"])(_RouterAdapter["default"].getAdapter, {
  crDfKey: function crDfKey(_ref) {
    var _ref$one = _ref.one,
        one = _ref$one === void 0 ? '' : _ref$one,
        _ref$two = _ref.two,
        two = _ref$two === void 0 ? '' : _ref$two;
    return one + '_' + two;
  }
});
var _default = IexAdapter;
exports["default"] = _default;
//# sourceMappingURL=IexAdapter.js.map