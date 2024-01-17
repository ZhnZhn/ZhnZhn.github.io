"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _LoadType = require("../../constants/LoadType");
var _loadNdlCommodityTrade = require("./loadNdlCommodityTrade");
var _LoadImpl = _interopRequireDefault(require("./LoadImpl"));
const LoadConfig = {
  ..._LoadImpl.default,
  [_LoadType.LT_QCT]: _loadNdlCommodityTrade.loadNdlCommodityTrade
};
var _default = exports.default = LoadConfig;
//# sourceMappingURL=LoadConfig.js.map