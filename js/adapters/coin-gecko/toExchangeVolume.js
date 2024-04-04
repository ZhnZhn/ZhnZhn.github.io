"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));
const crData = json => json.map(tuple => [tuple[0], parseFloat(tuple[1])]);
const toExchangeVolume = (0, _crAdapterType.default)({
  crData
});
var _default = exports.default = toExchangeVolume;
//# sourceMappingURL=toExchangeVolume.js.map