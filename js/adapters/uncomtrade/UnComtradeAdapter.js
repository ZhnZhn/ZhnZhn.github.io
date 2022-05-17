"use strict";

exports.__esModule = true;
exports.default = void 0;

var _fnAdapter = require("./fnAdapter");

const UnComtradeAdapter = {
  crKey: _fnAdapter.crChartId,

  toConfig(json, option) {
    return {
      config: (0, _fnAdapter.toConfig)(json, option) //isDrawDeltaExtrems: false,
      //isNotZoomToMinMax: false

    };
  }

};
var _default = UnComtradeAdapter;
exports.default = _default;
//# sourceMappingURL=UnComtradeAdapter.js.map