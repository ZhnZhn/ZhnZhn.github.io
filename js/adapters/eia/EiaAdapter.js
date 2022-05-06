"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));

var _fnAdapter = require("./fnAdapter");

const _assign = Object.assign;

const trOption = option => _assign(option, (0, _fnAdapter.crTitle)(option));

const EiaAdapter = (0, _crAdapterType.default)({
  crData: _fnAdapter.crData,
  crConfOption: _fnAdapter.crConfOption,
  trOption
});
var _default = EiaAdapter;
exports.default = _default;
//# sourceMappingURL=EiaAdapter.js.map