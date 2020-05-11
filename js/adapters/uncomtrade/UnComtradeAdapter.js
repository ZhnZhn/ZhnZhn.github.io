"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var UnComtradeAdapter = {
  crKey: _fnAdapter["default"].crChartId,
  toConfig: function toConfig(json, option) {
    var config = _fnAdapter["default"].toConfig(json, option);

    return {
      config: config //isDrawDeltaExtrems: false,
      //isNotZoomToMinMax: false

    };
  }
};
var _default = UnComtradeAdapter;
exports["default"] = _default;
//# sourceMappingURL=UnComtradeAdapter.js.map