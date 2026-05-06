"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = require("../crAdapterType1");
var _crTsFromData = _interopRequireDefault(require("../crTsFromData"));
const crData = json => (0, _crTsFromData.default)(json),
  toLineAdapter = (0, _crAdapterType.crAdapterType1)({
    crData
  });
var _default = exports.default = toLineAdapter;
//# sourceMappingURL=toLineAdapter.js.map