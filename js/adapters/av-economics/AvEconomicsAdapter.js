"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _crAdapterType = require("../crAdapterType1");
var _AvFn = require("../av/AvFn");
const _crData = (0, _AvFn.fCrData)('value', 'date'),
  crData = _ref => {
    let {
      data
    } = _ref;
    return _crData(data);
  },
  trOption = (option, json) => {
    const {
        title
      } = option,
      {
        unit
      } = json;
    option.title = (0, _AdapterFn.joinBy)(', ', title, unit);
  };
const AvEconomicsAdapter = (0, _crAdapterType.crAdapterType1)({
  crData,
  trOption
});
var _default = exports.default = AvEconomicsAdapter;
//# sourceMappingURL=AvEconomicsAdapter.js.map