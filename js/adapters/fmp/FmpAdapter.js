"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crAdapterRouter = _interopRequireDefault(require("../crAdapterRouter"));

var _toChart = _interopRequireDefault(require("./toChart"));

var _toHistorical = _interopRequireDefault(require("./toHistorical"));

var _rAdapter = {
  _pn: 'dfPn',
  DF: _toChart["default"],
  historical: _toHistorical["default"]
},
    FmpAdapter = (0, _crAdapterRouter["default"])(_rAdapter);
var _default = FmpAdapter;
exports["default"] = _default;
//# sourceMappingURL=FmpAdapter.js.map