"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));
var _fnAdapter = require("./fnAdapter");
const trOption = (option, json) => {
  (0, _fnAdapter.assign)(option, (0, _fnAdapter.crTitle)(option, json));
};
const DbNomicsAdapter = (0, _crAdapterType.default)({
  crData: _fnAdapter.crData,
  crConfOption: _fnAdapter.crConfOption,
  trOption
});
var _default = exports.default = DbNomicsAdapter;
//# sourceMappingURL=DbNomicsAdapter.js.map