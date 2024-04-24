"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _CategoryFn = require("../CategoryFn");
var _toLineAdapter = _interopRequireDefault(require("./toLineAdapter"));
var _toCategoryAdapter = _interopRequireDefault(require("./toCategoryAdapter"));
var _crAdapterRouter = require("../crAdapterRouter");
const getRoute = option => (0, _CategoryFn.isCategory)(option.seriaType) ? _toCategoryAdapter.default : _toLineAdapter.default;
const WtAdapter = (0, _crAdapterRouter.crAdapterRouter)({
  getRoute
});
var _default = exports.default = WtAdapter;
//# sourceMappingURL=WtAdapter.js.map