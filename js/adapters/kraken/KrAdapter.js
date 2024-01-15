"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterRouter = _interopRequireDefault(require("../crAdapterRouter"));
var _toKline = _interopRequireDefault(require("./toKline"));
var _toOrderBookDf = _interopRequireDefault(require("../toOrderBookDf"));
const _rAdapter = {
    DF: _toKline.default,
    OB: _toOrderBookDf.default
  },
  KrAdapter = (0, _crAdapterRouter.default)(_rAdapter);
var _default = exports.default = KrAdapter;
//# sourceMappingURL=KrAdapter.js.map