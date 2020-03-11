"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _RouterAdapter = _interopRequireDefault(require("../../adapters/RouterAdapter"));

var _loadItem = _interopRequireDefault(require("./loadItem"));

var LoadImpl = function () {
  var _conf = {},
      _hasOwnProperty = Object.prototype.hasOwnProperty.bind(_RouterAdapter["default"]);

  for (var key in _RouterAdapter["default"]) {
    if (_hasOwnProperty(key)) {
      _conf[key] = (0, _loadItem["default"])(_RouterAdapter["default"][key]);
    }
  }

  return _conf;
}();

var _default = LoadImpl;
exports["default"] = _default;
//# sourceMappingURL=LoadImpl.js.map