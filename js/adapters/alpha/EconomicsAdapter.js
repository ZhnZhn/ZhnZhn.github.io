"use strict";

exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = require("../crAdapterType1");
var _fnAdapter = require("./fnAdapter");
const _crData = (0, _fnAdapter.fCrData)('value', 'date'),
  crData = _ref => {
    let {
      data
    } = _ref;
    return _crData(data);
  };
const trOption = (option, json) => {
  const {
      title
    } = option,
    {
      unit
    } = json;
  option.title = (0, _fnAdapter.joinBy)(', ', title, unit);
};
let _adapter;
const EconomicsAdapter = () => _adapter || (_adapter = (0, _crAdapterType.crAdapterType1)({
  crData,
  trOption
}));
var _default = exports.default = EconomicsAdapter;
//# sourceMappingURL=EconomicsAdapter.js.map