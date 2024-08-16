"use strict";

exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = require("../crAdapterType1");
var _fnAdapter = require("./fnAdapter");
const trOption = (option, json) => {
  (0, _fnAdapter.assign)(option, (0, _fnAdapter.crTitle)(option, json));
};
const DbNomicsAdapter = (0, _crAdapterType.crAdapterType1)({
  crData: _fnAdapter.crData,
  crConfOption: _fnAdapter.crConfOption,
  trOption
});
var _default = exports.default = DbNomicsAdapter;
//# sourceMappingURL=DbNomicsAdapter.js.map