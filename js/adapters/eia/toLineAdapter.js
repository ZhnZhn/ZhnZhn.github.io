"use strict";

exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = require("../crAdapterType1");
var _fnAdapter = require("./fnAdapter");
const _assign = Object.assign,
  trOption = option => _assign(option, (0, _fnAdapter.crTitle)(option)),
  toLineAdapter = (0, _crAdapterType.crAdapterType1)({
    crData: _fnAdapter.crData,
    crConfOption: _fnAdapter.crConfOption,
    trOption
  });
var _default = exports.default = toLineAdapter;
//# sourceMappingURL=toLineAdapter.js.map