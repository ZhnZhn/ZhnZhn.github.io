"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _toChart = _interopRequireDefault(require("./toChart"));

var _toHistorical = _interopRequireDefault(require("./toHistorical"));

var _rAdapter = {
  DF: _toChart["default"],
  historical: _toHistorical["default"]
};
var RouterAdapter = {
  getAdapter: function getAdapter(_ref) {
    var dfPn = _ref.dfPn;
    return _rAdapter[dfPn] || _rAdapter.DF;
  }
};
var _default = RouterAdapter;
exports["default"] = _default;
//# sourceMappingURL=RouterAdapter.js.map