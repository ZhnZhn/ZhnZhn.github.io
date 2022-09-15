"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));

var _AdapterFn = require("../AdapterFn");

const crData = (json, option) => json.data.map(_ref => {
  let [year, value] = _ref;
  return [(0, _AdapterFn.ymdToUTC)(year), value];
});

const EmberAdapter = (0, _crAdapterType.default)({
  crData
});
var _default = EmberAdapter;
exports.default = _default;
//# sourceMappingURL=EmberAdapter.js.map