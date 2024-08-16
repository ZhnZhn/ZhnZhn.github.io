"use strict";

exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = require("../crAdapterType1");
const crData = json => json.map(tuple => [tuple[0], parseFloat(tuple[1])]);
const toExchangeVolume = (0, _crAdapterType.crAdapterType1)({
  crData
});
var _default = exports.default = toExchangeVolume;
//# sourceMappingURL=toExchangeVolume.js.map