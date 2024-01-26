"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterRouter = require("../crAdapterRouter");
var _toChart = _interopRequireDefault(require("./toChart"));
var _toHistorical = _interopRequireDefault(require("./toHistorical"));
const _rAdapter = {
    _pn: 'dfPn',
    DF: _toChart.default,
    historical: _toHistorical.default,
    intraday: _toHistorical.default
  },
  FmpAdapter = (0, _crAdapterRouter.crAdapterRouter)(_rAdapter);
var _default = exports.default = FmpAdapter;
//# sourceMappingURL=FmpAdapter.js.map