"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.getLoadImpl = exports.addLoadImpl = void 0;
var _RouterAdapter = _interopRequireDefault(require("../../adapters/RouterAdapter"));
var _loadItem = _interopRequireDefault(require("./loadItem"));
const _hmLoadImpl = Object.create(null);
const addLoadImpl = (key, adapter) => {
  if (!_hmLoadImpl[key]) {
    _hmLoadImpl[key] = (0, _loadItem.default)(adapter);
  }
};
exports.addLoadImpl = addLoadImpl;
const getLoadImpl = loadId => _hmLoadImpl[loadId];
exports.getLoadImpl = getLoadImpl;
const _initHmLoadImpl = () => {
  for (let key in _RouterAdapter.default) {
    addLoadImpl(key, _RouterAdapter.default[key]);
  }
};
_initHmLoadImpl();
//# sourceMappingURL=LoadImpl.js.map