"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _fnAdapter = require("./fnAdapter");

var _toConfig = _interopRequireDefault(require("./toConfig"));

const UnComtradeAdapter = {
  crKey: _fnAdapter.crChartId,

  toConfig(json, option) {
    return {
      config: (0, _toConfig.default)(json, option) //isDrawDeltaExtrems: false,
      //isNotZoomToMinMax: false

    };
  }

};
var _default = UnComtradeAdapter;
exports.default = _default;
//# sourceMappingURL=UnComtradeAdapter.js.map