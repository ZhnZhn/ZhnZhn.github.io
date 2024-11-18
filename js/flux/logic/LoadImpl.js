"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.getLoadImpl = void 0;
var _RouterAdapter = _interopRequireDefault(require("../../adapters/RouterAdapter"));
var _loadItem = _interopRequireDefault(require("./loadItem"));
const _hmLoadImpl = Object.create(null);
const _initHmLoadImpl = () => {
  for (let key in _RouterAdapter.default) {
    _hmLoadImpl[key] = (0, _loadItem.default)(_RouterAdapter.default[key]);
  }
};
_initHmLoadImpl();
const getLoadImpl = loadId => _hmLoadImpl[loadId];
exports.getLoadImpl = getLoadImpl;
//# sourceMappingURL=LoadImpl.js.map