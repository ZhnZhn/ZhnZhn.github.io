"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _RouterAdapter = _interopRequireDefault(require("../../adapters/RouterAdapter"));

var _loadItem = _interopRequireDefault(require("./loadItem"));

const LoadImpl = (() => {
  const _conf = {};

  for (let key in _RouterAdapter.default) {
    _conf[key] = (0, _loadItem.default)(_RouterAdapter.default[key]);
  }

  return _conf;
})();

var _default = LoadImpl;
exports.default = _default;
//# sourceMappingURL=LoadImpl.js.map