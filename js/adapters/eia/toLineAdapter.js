"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));
var _fnAdapter = require("./fnAdapter");
const _assign = Object.assign,
  trOption = option => _assign(option, (0, _fnAdapter.crTitle)(option)),
  toLineAdapter = (0, _crAdapterType.default)({
    crData: _fnAdapter.crData,
    crConfOption: _fnAdapter.crConfOption,
    trOption
  });
var _default = exports.default = toLineAdapter;
//# sourceMappingURL=toLineAdapter.js.map